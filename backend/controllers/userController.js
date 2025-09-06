const user = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.SignIn = async (req, res) => {
  const { nUser, pword, confirmPword, email } = req.body;

  // Validações de entrada
  if (!nUser) {
    return res.status(422).json({ msg: "O campo NOME DE USUÁRIO é obrigatório" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O campo EMAIL é obrigatório" });
  }
  if (!pword) {
    return res.status(422).json({ msg: "O campo SENHA é obrigatório" });
  }
  if (pword !== confirmPword) {
    return res.status(422).json({ msg: "As senhas devem ser iguais" });
  }

  try {
    // Verifica se usuário já existe
    const userExists = await user.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({ msg: "Usuário já existe" }); // 409 Conflict
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(12);
    const pwordHash = await bcrypt.hash(pword, salt);

    // Cria novo usuário
    const newUser = new user({
      nUser,
      email,
      pword: pwordHash,
    });

    await newUser.save();
    return res.status(201).json({ msg: "Usuário criado com sucesso" });

  } catch (error) {
    console.error("Erro no SignIn:", error);
    
    // Tratamento específico para erros de validação do MongoDB
    if (error.name === 'ValidationError') {
      return res.status(422).json({ msg: "Dados inválidos", details: error.message });
    }
    
    // Tratamento para erro de duplicação (caso tenha índice único)
    if (error.code === 11000) {
      return res.status(409).json({ msg: "Email já está em uso" });
    }
    
    return res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

exports.login = async (req, res) => {
  const { email, pword } = req.body;

  // Validações de entrada
  if (!email) {
    return res.status(422).json({ msg: "O campo EMAIL é obrigatório" });
  }
  if (!pword) {
    return res.status(422).json({ msg: "O campo SENHA é obrigatório" });
  }

  try {
    // Verifica se usuário existe
    const userExists = await user.findOne({ email: email });
    if (!userExists) {
      return res.status(401).json({ msg: "Email ou senha incorretos" }); // Não revela se email existe
    }

    // Valida senha
    const validate = await bcrypt.compare(pword, userExists.pword);
    if (!validate) {
      return res.status(401).json({ msg: "Email ou senha incorretos" }); // Mesma mensagem por segurança
    }

    // Gera token
    const segredo = process.env.SECRET;
    if (!segredo) {
      console.error("SECRET não configurado no ambiente");
      return res.status(500).json({ msg: "Erro de configuração do servidor" });
    }

    const token = jwt.sign(
      { id: userExists._id },
      segredo,
      { expiresIn: '24h' } // Adiciona expiração ao token
    );

    res.status(200).json({ 
      msg: "Autenticação realizada com sucesso", 
      token 
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ msg: "Erro interno do servidor" });
  }
};