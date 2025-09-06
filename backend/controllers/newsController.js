const news = require("../models/newsModels");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    // Validação de arquivo
    if (!req.file) {
      return res.status(400).json({ msg: "Imagem é obrigatória" });
    }

    // Verifica tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ msg: "Formato de imagem não suportado. Use JPEG, PNG, GIF ou WebP" });
    }

    // Verifica tamanho do arquivo (exemplo: 5MB)
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ msg: "Imagem muito grande. Máximo 5MB" });
    }

    const img = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const { title, desc, details, authorEmail } = req.body;

    // Validações de campos obrigatórios
    if (!authorEmail) {
      return res.status(422).json({ msg: "O campo E-mail do Autor é obrigatório" });
    }
    if (!title) {
      return res.status(422).json({ msg: "O campo Título é obrigatório" });
    }
    if (!desc) {
      return res.status(422).json({ msg: "O campo Descrição é obrigatório" });
    }
    if (!details) {
      return res.status(422).json({ msg: "O campo Detalhes é obrigatório" });
    }

    // Cria a notícia
    const newsPost = new news({ img, title, desc, details, authorEmail });
    await newsPost.save();
    
    res.status(201).json({ 
      msg: "Notícia criada com sucesso", 
      news: newsPost 
    });

  } catch (error) {
    console.error("Erro ao criar notícia:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(422).json({ msg: "Dados inválidos", details: error.message });
    }
    
    return res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  // Valida se ID é válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const newsDeleted = await news.findByIdAndDelete(id);
    if (!newsDeleted) {
      return res.status(404).json({ msg: "Notícia não encontrada" });
    }

    res.status(200).json({ msg: "Notícia deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar notícia:", error);
    return res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  const { title, desc, details } = req.body;

  // Valida se ID é válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    let updateData = { title, desc, details };

    // Se há arquivo, valida e adiciona
    if (req.file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ msg: "Formato de imagem não suportado" });
      }
      updateData.img = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const putNews = await news.findByIdAndUpdate(id, updateData, { 
      new: true,
      runValidators: true // Executa validações do schema
    });

    if (!putNews) {
      return res.status(404).json({ msg: "Notícia não encontrada" });
    }

    return res.status(200).json({ 
      msg: "Notícia editada com sucesso", 
      news: putNews 
    });

  } catch (error) {
    console.error("Erro ao editar notícia:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(422).json({ msg: "Dados inválidos", details: error.message });
    }
    
    return res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

exports.searchAllNews = async (req, res) => {
  try {
    const newsSearch = await news.find().sort({ createdAt: -1 }); // Ordena por mais recente
    
    // Se não há notícias, retorna array vazio com status 200
    if (newsSearch.length === 0) {
      return res.status(200).json({ 
        msg: "Nenhuma notícia encontrada", 
        news: [] 
      });
    }
    
    return res.status(200).json(newsSearch); // 200 para busca bem-sucedida

  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

exports.getDetails = async (req, res) => {
  const { id } = req.params;

  // Valida se ID foi fornecido
  if (!id) {
    return res.status(400).json({ msg: "ID é obrigatório" });
  }

  // Valida se ID é válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const newsItem = await news.findById(id);
    if (!newsItem) {
      return res.status(404).json({ msg: "Notícia não encontrada" });
    }
    
    res.status(200).json(newsItem);
  } catch (error) {
    console.error("Erro ao buscar detalhes da notícia:", error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
};