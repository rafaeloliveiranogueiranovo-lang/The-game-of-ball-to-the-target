Action: file_editor view /app/frontend/public/game.js
Observation: /app/frontend/public/game.js:
1|// ========================================
2|// JOGO DE PRECISÃO - ACERTE O ALVO
3|// ========================================
4|
5|// Espera o DOM carregar antes de iniciar
6|document.addEventListener('DOMContentLoaded', () => {
7|    console.log('🎮 Jogo iniciado - DOM carregado');
8|    initGame();
9|});
10|
11|// ========================================
12|// VARIÁVEIS GLOBAIS
13|// ========================================
14|
15|let canvas, ctx;
16|let gameState = 'playing'; // 'playing', 'victory', 'defeat'
17|let score = 0;
18|let animationId;
19|
20|// Configurações do jogo
21|const config = {
22|    targetParts: 8,
23|    breakableParts: 6, // Partes que podem ser quebradas
24|    targetSpeed: 1.2, // Velocidade moderada
25|    ballSpeed: 6, 
26|    ballRadius: 15,
27|    targetWidth: 380,
28|    targetHeight: 55,
29|    trailLength: 15 // Tamanho do rastro
30|};
31|
32|// Objeto da bola
33|const ball = {
34|    x: 0,
35|    y: 0,
36|    radius: config.ballRadius,
37|    velocityX: 0,
38|    velocityY: 0,
39|    isLaunched: false,
40|    trail: [] // Array para armazenar posições anteriores
41|};
42|
43|// Objeto do alvo
44|const target = {
45|    x: 0,
46|    y: 50,
47|    width: config.targetWidth,
48|    height: config.targetHeight,
49|    velocityX: config.targetSpeed,
50|    parts: [] // Array de partes do alvo
51|};
52|
53|// ========================================
54|// INICIALIZAÇÃO
55|// ========================================
56|
57|function initGame() {
58|    // Verifica se o canvas existe
59|    canvas = document.getElementById('gameCanvas');
60|    if (!canvas) {
61|        console.error('❌ Canvas não encontrado!');
62|        return;
63|    }
64|
65|    ctx = canvas.getContext('2d');
66|    if (!ctx) {
67|        console.error('❌ Contexto 2D não disponível!');
68|        return;
69|    }
70|
71|    console.log('✅ Canvas inicializado');
72|
73|    // Configura o tamanho do canvas
74|    resizeCanvas();
75|    window.addEventListener('resize', resizeCanvas);
76|
77|    // Inicializa posições
78|    resetBall();
79|    initTarget();
80|
81|    // Configura controles
82|    setupControls();
83|
84|    // Inicia o loop do jogo
85|    console.log('🔄 Iniciando loop do jogo');
86|    gameLoop();
87|}
88|
89|// ========================================
90|// CONFIGURAÇÃO DO CANVAS
91|// ========================================
92|
93|function resizeCanvas() {
94|    // Define tamanho responsivo
95|    const maxWidth = 800;
96|    const maxHeight = 600;
97|    const padding = 20;
98|
99|    let width = Math.min(window.innerWidth - padding, maxWidth);
100|    let height = Math.min(window.innerHeight - padding * 4, maxHeight);
101|
102|    // Mantém proporção 4:3
103|    const ratio = 4 / 3;
104|    if (width / height > ratio) {
105|        width = height * ratio;
106|    } else {
107|        height = width / ratio;
108|    }
109|
110|    canvas.width = width;
111|    canvas.height = height;
112|
113|    // Reposiciona elementos após resize
114|    if (ball.x === 0 && ball.y === 0) {
115|        resetBall();
116|    }
117|
118|    console.log(`📐 Canvas redimensionado: ${width}x${height}`);
119|}
120|
121|// ========================================
122|// INICIALIZAÇÃO DO ALVO
123|// ========================================
124|
125|function initTarget() {
126|    target.x = canvas.width / 2 - target.width / 2;
127|    target.parts = [];
128|
129|    const partWidth = target.width / config.targetParts;
130|
131|    for (let i = 0; i < config.targetParts; i++) {
132|        // Define quais partes são quebráveis
133|        // Partes 1 e 6 (índices 1 e 6) causam derrota
134|        const isBreakable = i !== 1 && i !== 6;
135|        
136|        target.parts.push({
137|            index: i,
138|            x: target.x + i * partWidth,
139|            y: target.y,
140|            width: partWidth,
141|            height: target.height,
142|            isBreakable: isBreakable,
143|            isDestroyed: false,
144|            color: isBreakable ? '#4ecca3' : '#ff6b6b'
145|        });
146|    }
147|
148|    console.log(`🎯 Alvo criado com ${config.targetParts} partes (${config.breakableParts} quebráveis)`);
149|}
150|
151|// ========================================
152|// RESET DA BOLA
153|// ========================================
154|
155|function resetBall() {
156|    ball.x = canvas.width / 2;
157|    ball.y = canvas.height - 50;
158|    ball.velocityX = 0;
159|    ball.velocityY = 0;
160|    ball.isLaunched = false;
161|    ball.trail = []; // Limpa o rastro
162|    console.log('🔵 Bola resetada para posição inicial');
163|}
164|
165|// ========================================
166|// CONTROLES
167|// ========================================
168|
169|function setupControls() {
170|    // Mouse
171|    canvas.addEventListener('click', handleLaunch);
172|    
173|    // Touch (mobile)
174|    canvas.addEventListener('touchstart', (e) => {
175|        e.preventDefault();
176|        handleLaunch(e.touches[0]);
177|    });
178|
179|    console.log('🎮 Controles configurados (mouse + touch)');
180|}
181|
182|function handleLaunch(e) {
183|    if (gameState !== 'playing') return;
184|    if (ball.isLaunched) return; // Apenas um lançamento por vez
185|
186|    const rect = canvas.getBoundingClientRect();
187|    const clickX = e.clientX - rect.left;
188|    const clickY = e.clientY - rect.top;
189|
190|    // Calcula direção do lançamento
191|    const dx = clickX - ball.x;
192|    const dy = clickY - ball.y;
193|    const distance = Math.sqrt(dx * dx + dy * dy);
194|
195|    if (distance > 0) {
196|        ball.velocityX = (dx / distance) * config.ballSpeed;
197|        ball.velocityY = (dy / distance) * config.ballSpeed;
198|        ball.isLaunched = true;
199|        console.log(`🚀 Bola lançada em direção a (${clickX.toFixed(0)}, ${clickY.toFixed(0)})`);
200|    }
201|}
202|
203|// ========================================
204|// LOOP DO JOGO
205|// ========================================
206|
207|function gameLoop() {
208|    update();
209|    draw();
210|    animationId = requestAnimationFrame(gameLoop);
211|}
212|
213|// ========================================
214|// ATUALIZAÇÃO (LÓGICA)
215|// ========================================
216|
217|function update() {
218|    if (gameState !== 'playing') return;
219|
220|    // Atualiza movimento da bola
221|    if (ball.isLaunched) {
222|        // Adiciona posição atual ao rastro
223|        ball.trail.push({
224|            x: ball.x,
225|            y: ball.y
226|        });
227|
228|        // Limita tamanho do rastro
229|        if (ball.trail.length > config.trailLength) {
230|            ball.trail.shift();
231|        }
232|
233|        ball.x += ball.velocityX;
234|        ball.y += ball.velocityY;
235|
236|        // Verifica colisão com alvo ANTES de verificar limites
237|        const hitSomething = checkCollision();
238|        
239|        // Se acertou algo, não verifica limites
240|        if (hitSomething) {
241|            return;
242|        }
243|
244|        // Verifica limites do canvas
245|        // Permite sair bastante pelo topo (onde está o alvo), mas não pelos lados ou por baixo
246|        if (ball.x < -ball.radius * 2 || ball.x > canvas.width + ball.radius * 2 ||
247|            ball.y < -300 || ball.y > canvas.height + ball.radius * 2) {
248|            console.log('❌ Bola saiu dos limites - Errou o alvo!');
249|            handleMiss();
250|            return;
251|        }
252|    }
253|
254|    // Atualiza movimento do alvo
255|    updateTarget();
256|}
257|
258|// ========================================
259|// ATUALIZAÇÃO DO ALVO
260|// ========================================
261|
262|function updateTarget() {
263|    target.x += target.velocityX;
264|
265|    // Inverte direção ao atingir limites
266|    if (target.x <= 0 || target.x + target.width >= canvas.width) {
267|        target.velocityX *= -1;
268|        target.x = Math.max(0, Math.min(target.x, canvas.width - target.width));
269|    }
270|
271|    // Atualiza posição das partes
272|    const partWidth = target.width / config.targetParts;
273|    target.parts.forEach((part, i) => {
274|        if (!part.isDestroyed) {
275|            part.x = target.x + i * partWidth;
276|            part.y = target.y; // Atualiza Y também
277|        }
278|    });
279|}
280|
281|// ========================================
282|// DETECÇÃO DE COLISÃO
283|// ========================================
284|
285|function checkCollision() {
286|    for (let part of target.parts) {
287|        if (part.isDestroyed) continue;
288|
289|        // Verifica colisão circular com retângulo
290|        const closestX = Math.max(part.x, Math.min(ball.x, part.x + part.width));
291|        const closestY = Math.max(part.y, Math.min(ball.y, part.y + part.height));
292|
293|        const distanceX = ball.x - closestX;
294|        const distanceY = ball.y - closestY;
295|        const distanceSquared = distanceX * distanceX + distanceY * distanceY;
296|
297|        if (distanceSquared < ball.radius * ball.radius) {
298|            console.log(`💥 Colisão detectada com parte ${part.index} (quebrável: ${part.isBreakable})`);
299|            handleCollision(part);
300|            return true; // Retorna true se houve colisão
301|        }
302|    }
303|    return false; // Retorna false se não houve colisão
304|}
305|
306|// ========================================
307|// MANIPULAÇÃO DE COLISÃO
308|// ========================================
309|
310|function handleCollision(part) {
311|    if (part.isBreakable) {
312|        // Parte quebrável - aumenta pontuação
313|        part.isDestroyed = true;
314|        score += 10;
315|        updateScore();
316|        console.log(`✅ Parte ${part.index} destruída! Pontuação: ${score}`);
317|
318|        // Verifica vitória
319|        const remainingBreakable = target.parts.filter(p => p.isBreakable && !p.isDestroyed);
320|        if (remainingBreakable.length === 0) {
321|            handleVictory();
322|        } else {
323|            resetBall();
324|        }
325|    } else {
326|        // Parte que causa derrota
327|        console.log(`💀 Acertou parte errada (${part.index}) - Game Over!`);
328|        handleDefeat();
329|    }
330|}
331|
332|// ========================================
333|// ERRAR O ALVO
334|// ========================================
335|
336|function handleMiss() {
337|    console.log('💀 Errou o alvo - Game Over!');
338|    handleDefeat();
339|}
340|
341|// ========================================
342|// VITÓRIA
343|// ========================================
344|
345|function handleVictory() {
346|    gameState = 'victory';
347|    console.log('🎉 VITÓRIA! Todas as partes quebráveis destruídas!');
348|    showMessage('🎉 VITÓRIA! 🎉<br>Clique para jogar novamente', 'victory');
349|}
350|
351|// ========================================
352|// DERROTA
353|// ========================================
354|
355|function handleDefeat() {
356|    gameState = 'defeat';
357|    console.log('💀 GAME OVER!');
358|    showMessage('💀 GAME OVER!<br>Clique para tentar novamente', 'defeat');
359|}
360|
361|// ========================================
362|// EXIBIR MENSAGEM
363|// ========================================
364|
365|function showMessage(text, type) {
366|    const messageEl = document.getElementById('message');
367|    messageEl.innerHTML = text;
368|    messageEl.className = `message ${type}`;
369|    
370|    // Configura clique para reiniciar
371|    messageEl.onclick = restartGame;
372|}
373|
374|// ========================================
375|// REINICIAR JOGO
376|// ========================================
377|
378|function restartGame() {
379|    console.log('🔄 Reiniciando jogo...');
380|    gameState = 'playing';
381|    score = 0;
382|    updateScore();
383|    resetBall();
384|    initTarget();
385|    
386|    // Esconde mensagem
387|    const messageEl = document.getElementById('message');
388|    messageEl.className = 'message hidden';
389|    messageEl.onclick = null;
390|    
391|    console.log('✅ Jogo reiniciado');
392|}
393|
394|// ========================================
395|// ATUALIZAR PONTUAÇÃO
396|// ========================================
397|
398|function updateScore() {
399|    document.getElementById('score').textContent = `Pontuação: ${score}`;
400|}
401|
402|// ========================================
403|// RENDERIZAÇÃO
404|// ========================================
405|
406|function draw() {
407|    // Limpa canvas
408|    ctx.fillStyle = '#0a0e27';
409|    ctx.fillRect(0, 0, canvas.width, canvas.height);
410|
411|    // Desenha rastro da bola
412|    drawTrail();
413|
414|    // Desenha alvo
415|    drawTarget();
416|
417|    // Desenha bola
418|    drawBall();
419|
420|    // Desenha instruções (apenas quando não lançada)
421|    if (!ball.isLaunched && gameState === 'playing') {
422|        drawInstructions();
423|    }
424|}
425|
426|// ========================================
427|// DESENHAR RASTRO
428|// ========================================
429|
430|function drawTrail() {
431|    if (ball.trail.length < 2) return;
432|
433|    for (let i = 0; i < ball.trail.length; i++) {
434|        const pos = ball.trail[i];
435|        const alpha = (i + 1) / ball.trail.length; // Fade effect
436|        const radius = ball.radius * alpha * 0.7;
437|
438|        ctx.beginPath();
439|        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
440|        ctx.fillStyle = `rgba(94, 206, 239, ${alpha * 0.5})`;
441|        ctx.fill();
442|    }
443|}
444|
445|// ========================================
446|// DESENHAR ALVO
447|// ========================================
448|
449|function drawTarget() {
450|    target.parts.forEach(part => {
451|        if (part.isDestroyed) return;
452|
453|        // Sombra
454|        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
455|        ctx.shadowBlur = 10;
456|        ctx.shadowOffsetY = 5;
457|
458|        // Parte do alvo
459|        ctx.fillStyle = part.color;
460|        ctx.fillRect(part.x, part.y, part.width, part.height);
461|
462|        // Borda
463|        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
464|        ctx.lineWidth = 2;
465|        ctx.strokeRect(part.x, part.y, part.width, part.height);
466|
467|        // Remove sombra
468|        ctx.shadowColor = 'transparent';
469|        ctx.shadowBlur = 0;
470|        ctx.shadowOffsetY = 0;
471|
472|        // Ícone (X para partes perigosas)
473|        if (!part.isBreakable) {
474|            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
475|            ctx.font = 'bold 24px Arial';
476|            ctx.textAlign = 'center';
477|            ctx.textBaseline = 'middle';
478|            ctx.fillText('✕', part.x + part.width / 2, part.y + part.height / 2);
479|        }
480|    });
481|}
482|
483|// ========================================
484|// DESENHAR BOLA
485|// ========================================
486|
487|function drawBall() {
488|    // Sombra
489|    ctx.shadowColor = 'rgba(94, 206, 239, 0.5)';
490|    ctx.shadowBlur = 20;
491|
492|    // Bola
493|    ctx.beginPath();
494|    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
495|    
496|    // Gradiente
497|    const gradient = ctx.createRadialGradient(
498|        ball.x - ball.radius / 3, 
499|        ball.y - ball.radius / 3, 
500|        0,
501|        ball.x, 
502|        ball.y, 
503|        ball.radius
504|    );
505|    gradient.addColorStop(0, '#5eceef');
506|    gradient.addColorStop(1, '#3b9ecc');
507|    
508|    ctx.fillStyle = gradient;
509|    ctx.fill();
510|
511|    // Borda brilhante
512|    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
513|    ctx.lineWidth = 2;
514|    ctx.stroke();
515|
516|    // Remove sombra
517|    ctx.shadowColor = 'transparent';
518|    ctx.shadowBlur = 0;
519|}
520|
521|// ========================================
522|// DESENHAR INSTRUÇÕES
523|// ========================================
524|
525|function drawInstructions() {
526|    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
527|    ctx.font = '16px Arial';
528|    ctx.textAlign = 'center';
529|    ctx.textBaseline = 'middle';
530|    ctx.fillText('Clique para lançar a bola', canvas.width / 2, canvas.height - 20);
531|    
532|    // Indicador visual
533|    const pulse = Math.sin(Date.now() / 300) * 0.5 + 0.5;
534|    ctx.strokeStyle = `rgba(94, 206, 239, ${pulse})`;
535|    ctx.lineWidth = 3;
536|    ctx.beginPath();
537|    ctx.arc(ball.x, ball.y, ball.radius + 10 + pulse * 5, 0, Math.PI * 2);
538|    ctx.stroke();
539|}
540|
541|// ========================================
542|// CONSOLE LOG FINAL
543|// ========================================
544|console.log('📝 Game.js carregado completamente - Aguardando DOM');
545|
