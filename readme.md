# 📰 Blog/Sistema de Notícias - Technical Test

Sistema fullstack para gerenciamento de notícias com React/Next.js no frontend e Node.js no backend.

## 🎯 Decisões Técnicas

### **Frontend**
- **Next.js 14 com App Router**: Escolhido pela performance, SEO otimizado e melhor developer experience
- **TypeScript**: Maior segurança de tipos, melhor IntelliSense e redução de bugs em produção
- **Tailwind CSS**: Desenvolvimento rápido, design system consistente e bundle otimizado
- **Componentes modulares**: Arquitetura focada em reutilização e manutenibilidade

### **Backend**
- **Express.js**: Framework minimalista, flexível e com grande ecossistema
- **MongoDB + Mongoose**: NoSQL para flexibilidade na estrutura de dados e ODM robusto
- **JWT**: Autenticação stateless, escalável e ideal para APIs REST
- **Multer**: Upload de imagens com validação e controle de tamanho

### **Arquitetura**
- **Monorepo**: Facilita desenvolvimento, versionamento e deploy conjunto
- **Separação de responsabilidades**: Controllers, middlewares, validations bem definidos
- **Upload local**: Simplicidade para desenvolvimento (facilmente migrado para cloud)
- **API RESTful**: Padrão consolidado e fácil integração

### **UX/UI**
- **Drag & Drop**: Interface intuitiva para upload de imagens
- **Estados visuais**: Feedback claro durante loading, success e error
- **Responsividade**: Mobile-first approach com breakpoints bem definidos
- **Componentes reutilizáveis**: Dialogs, botões e cards padronizados

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones
- **React Spinners** - Componentes de loading

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Multer** - Middleware para upload de arquivos
- **JWT** - JSON Web Tokens para autenticação
- **Bcrypt** - Hash de senhas
- **Dotenv** - Gerenciamento de variáveis de ambiente

## ⚙️ Configuração e Instalação

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **MongoDB** (local ou MongoDB Atlas)
- **npm** ou **yarn**

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/seu-usuario/my-technical-test.git
cd my-technical-test

2️⃣ Instale as dependências

# Instalar dependências de ambos os projetos
npm run install:all

3️⃣ Configuração do Backend

Variáveis de ambiente

Crie um arquivo .env na pasta backend/:

# Banco de dados
MONGODB_URI=mongodb://localhost:27017/technical-test
# ou para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/technical-test

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro_aqui

# Servidor
PORT=4200
NODE_ENV=development

# Upload de arquivos
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760

# CORS
FRONTEND_URL=http://localhost:3000

### 📚 Scripts Disponíveis

# Desenvolvimento
npm run dev                 # Roda frontend + backend
npm run dev:frontend        # Só frontend
npm run dev:backend         # Só backend

# Instalação
npm run install:all         # Instala tudo
npm run install:frontend    # Só frontend
npm run install:backend     # Só backend

# Build
npm run build:frontend      # Build do frontend
npm run build              # Build completo