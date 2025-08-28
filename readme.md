# Index vs Initiative Calculator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy Status](https://img.shields.io/badge/deploy-live-brightgreen)](https://benjaminbeck.com/index-vs-initiative-calculator)

A web-based calculator that helps investors compare passive index investing ("Chill") versus active investment strategies ("Thrill"). Make informed decisions about your investment approach by visualizing potential outcomes, costs, and long-term projections.

**🔗 [Live Demo](https://benjaminbeck.com/index-vs-initiative-calculator)**

## ✨ Features

- 📊 **Side-by-side comparison** of index funds vs active investment strategies
- 📈 **Interactive projections** showing potential returns over time
- 💰 **Cost analysis** including fees, taxes, and transaction costs
- ⚠️ **Risk assessment** visualization
- 🎛️ **Customizable parameters** for different investment scenarios
- 📱 **Mobile-responsive design** for calculations on the go

## 🚀 Quick Start

1. **📥 Clone the repository**
   ```bash
   git clone https://github.com/benbeck/index-vs-initiative-calculator.git
   cd index-vs-initiative-calculator
   ```

2. **⚙️ Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration values
   ```

3. **📦 Install dependencies and run**
   ```bash
   npm install
   npm run dev
   ```

4. **🌐 Open your browser** to `http://localhost:3000`

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# API Configuration (if using external data sources)
FINANCIAL_DATA_API_KEY=your_api_key_here
MARKET_DATA_ENDPOINT=https://api.example.com

# Application Settings
NODE_ENV=development
PORT=3000
```

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Chart.js for visualizations
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Deployment:** Vercel/Netlify ready

## 📖 Usage

1. **📊 Input your investment parameters:**
   - Initial investment amount
   - Monthly contribution
   - Investment timeline
   - Risk tolerance

2. **⚖️ Compare strategies:**
   - **Index Approach:** Low-cost index funds, passive management
   - **Initiative Approach:** Active stock picking, higher engagement

3. **📈 Analyze results:**
   - View projected returns
   - Compare total costs
   - Assess risk-adjusted performance

## 🧰 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript checks
- `npm run lint` - Lint code with ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

## ⚠️ Disclaimer

This calculator is for educational and informational purposes only. It does not constitute financial advice. Always consult with qualified financial professionals before making investment decisions.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">
  
**Built with ❤️ for informed investing decisions**

[Report Bug](https://github.com/benbeck/index-vs-initiative-calculator/issues) • [Request Feature](https://github.com/benbeck/index-vs-initiative-calculator/issues) • [Documentation](https://github.com/benbeck/index-vs-initiative-calculator/wiki)

</div>


