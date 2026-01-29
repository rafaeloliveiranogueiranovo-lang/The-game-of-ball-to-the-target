Action: file_editor view /app/frontend/public/README_GAME.md
Observation: /app/frontend/public/README_GAME.md:
1|# 🎯 Jogo de Precisão - Acerte o Alvo
2|
3|Jogo 2D de precisão e timing desenvolvido em **HTML, CSS e JavaScript puro** (sem frameworks), usando `<canvas>`.
4|
5|## 🎮 Como Jogar
6|
7|1. **Objetivo**: Destrua todas as 6 partes verdes do alvo sem acertar as partes vermelhas com X
8|2. **Controles**: 
9|   - **Desktop**: Clique do mouse na direção desejada
10|   - **Mobile**: Toque na tela na direção desejada
11|3. **Mecânica**: 
12|   - A bola fica parada na parte inferior
13|   - Clique para lançá-la em qualquer direção
14|   - Acerte as partes **verdes** para ganhar pontos
15|   - Evite as partes **vermelhas com X** (causam Game Over)
16|   - O alvo se move horizontalmente, aumentando o desafio!
17|
18|## ✨ Características
19|
20|### Visuais
21|- ✅ Canvas responsivo (funciona em desktop e mobile)
22|- ✅ Gradiente bonito de fundo (roxo-azulado)
23|- ✅ **Rastro estilo Angry Birds** com efeito fade
24|- ✅ Bola com gradiente e brilho
25|- ✅ Alvo dividido em 8 partes coloridas
26|- ✅ Indicador visual pulsante quando pronto para lançar
27|- ✅ Mensagens de vitória e derrota estilizadas
28|
29|### Mecânicas
30|- ✅ Sistema de colisão preciso (círculo vs retângulo)
31|- ✅ Alvo em movimento contínuo
32|- ✅ Sistema de pontuação funcional
33|- ✅ 6 partes quebráveis (verdes)
34|- ✅ 2 partes perigosas (vermelhas com X)
35|- ✅ Apenas um lançamento por vez
36|- ✅ Bola retorna à posição inicial após cada tentativa
37|
38|### Técnicas
39|- ✅ Loop do jogo com `requestAnimationFrame`
40|- ✅ Separação de lógica (update) e renderização (draw)
41|- ✅ Código limpo, organizado e comentado
42|- ✅ Console logs para debug
43|- ✅ Compatível com GitHub Pages
44|- ✅ Sem erros no console
45|
46|## 📁 Estrutura de Arquivos
47|
48|```
49|/app/frontend/public/
50|├── game.html          # Página principal do jogo
51|├── game.css           # Estilos e responsividade
52|└── game.js            # Lógica completa do jogo
53|```
54|
55|## 🚀 Como Executar
56|
57|### Método 1: Servidor Local
58|```bash
59|# Navegue até a pasta
60|cd /app/frontend/public
61|
62|# Abra game.html diretamente no navegador
63|open game.html  # Mac
64|start game.html # Windows
65|xdg-open game.html # Linux
66|```
67|
68|### Método 2: Servidor HTTP
69|```bash
70|# Python 3
71|python3 -m http.server 8000
72|
73|# Acesse: http://localhost:8000/game.html
74|```
75|
76|### Método 3: Live Server (VS Code)
77|1. Instale a extensão "Live Server"
78|2. Clique com botão direito em `game.html`
79|3. Selecione "Open with Live Server"
80|
81|## 🎯 Configurações do Jogo
82|
83|No arquivo `game.js`, você pode ajustar facilmente:
84|
85|```javascript
86|const config = {
87|    targetParts: 8,        // Número de partes do alvo
88|    breakableParts: 6,     // Quantas são quebráveis
89|    targetSpeed: 1.2,      // Velocidade do alvo
90|    ballSpeed: 6,          // Velocidade da bola
91|    ballRadius: 15,        // Tamanho da bola
92|    targetWidth: 380,      // Largura do alvo
93|    targetHeight: 55,      // Altura do alvo
94|    trailLength: 15        // Tamanho do rastro
95|};
96|```
97|
98|## 🔧 Console Logs
99|
100|O jogo fornece logs detalhados no console do navegador:
101|- 🎮 Inicialização do jogo
102|- 🚀 Lançamentos da bola
103|- 💥 Colisões detectadas
104|- ✅ Partes destruídas
105|- 💀 Game Over
106|- 🎉 Vitória
107|- 🔄 Reinícios
108|
109|## 📱 Responsividade
110|
111|O jogo se adapta automaticamente a diferentes tamanhos de tela:
112|- **Desktop**: 800x600px (máximo)
113|- **Tablet**: Ajuste automático
114|- **Mobile**: Ajuste automático com proporção 4:3
115|
116|## 🎨 Paleta de Cores
117|
118|- **Fundo**: Gradiente roxo-azulado (#667eea → #764ba2)
119|- **Canvas**: Gradiente escuro (#1a1a2e → #0f3460)
120|- **Bola**: Azul turquesa (#5eceef → #3b9ecc)
121|- **Partes Quebráveis**: Verde (#4ecca3)
122|- **Partes Perigosas**: Vermelho (#ff6b6b)
123|- **Vitória**: Gradiente verde (#11998e → #38ef7d)
124|- **Derrota**: Gradiente vermelho (#eb3349 → #f45c43)
125|
126|## 🏆 Condições de Vitória e Derrota
127|
128|### Vitória
129|- Destruir todas as 6 partes verdes (quebráveis)
130|- Mensagem: "🎉 VITÓRIA! 🎉"
131|
132|### Derrota
133|- Acertar uma parte vermelha com X
134|- Errar o alvo completamente
135|- Mensagem: "💀 GAME OVER!"
136|
137|## 🔮 Próximas Fases (Preparado para Expansão)
138|
139|O código está estruturado para facilmente adicionar:
140|- Múltiplas fases com dificuldade crescente
141|- Power-ups
142|- Diferentes tipos de alvos
143|- Sistema de vidas
144|- Placar de recordes
145|- Efeitos sonoros
146|
147|## 💻 Compatibilidade
148|
149|- ✅ Chrome/Edge (recomendado)
150|- ✅ Firefox
151|- ✅ Safari
152|- ✅ Opera
153|- ✅ Navegadores mobile (iOS/Android)
154|
155|## 📄 Licença
156|
157|Este projeto foi criado como demonstração de desenvolvimento de jogos 2D com JavaScript puro.
158|
159|---
160|
161|**Desenvolvido com HTML5 Canvas, CSS3 e JavaScript puro (ES6+)**
162|
163|Divirta-se jogando! 🎮🎯
164|
