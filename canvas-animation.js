// Dynamic Hero Canvas Animation - Elegant Full Width
class HeroCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.nodes = [];
        this.time = 0;
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        
        this.setupCanvas();
        this.createNodes();
        this.createParticles();
        this.addEventListeners();
        this.animate();
        
        window.addEventListener('resize', () => this.setupCanvas());
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    addEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    createNodes() {
        this.nodes = [
            { 
                x: window.innerWidth * 0.2, 
                y: window.innerHeight * 0.35, 
                radius: 14, 
                color: '#1f2937', 
                pulseSpeed: 0.018,
                intensity: 1.2
            },
            { 
                x: window.innerWidth * 0.5, 
                y: window.innerHeight * 0.5, 
                radius: 12, 
                color: '#dc2626', 
                pulseSpeed: 0.022,
                intensity: 1.4
            },
            { 
                x: window.innerWidth * 0.78, 
                y: window.innerHeight * 0.4, 
                radius: 13, 
                color: '#1f2937', 
                pulseSpeed: 0.02,
                intensity: 1.1
            },
            { 
                x: window.innerWidth * 0.72, 
                y: window.innerHeight * 0.75, 
                radius: 9, 
                color: '#6b7280', 
                pulseSpeed: 0.019,
                intensity: 0.9
            },
            { 
                x: window.innerWidth * 0.28, 
                y: window.innerHeight * 0.7, 
                radius: 11, 
                color: '#dc2626', 
                pulseSpeed: 0.021,
                intensity: 1.15
            }
        ];
        
        this.nodes.forEach(node => {
            node.pulseRadius = node.radius;
            node.offsetX = 0;
            node.offsetY = 0;
            node.baseX = node.x;
            node.baseY = node.y;
        });
    }
    
    createParticles() {
        const particleCount = 120;
        for (let i = 0; i < particleCount; i++) {
            const isRed = Math.random() > 0.65;
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2.5,
                vy: (Math.random() - 0.5) * 2.5,
                radius: Math.random() * 2.5 + 0.8,
                color: isRed ? 'rgba(220, 38, 38, 0.6)' : 'rgba(31, 41, 55, 0.5)',
                trail: [],
                life: Math.random() * 0.6 + 0.4,
                friction: 0.98
            });
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > 15) particle.trail.shift();
            
            particle.vx *= particle.friction;
            particle.vy *= particle.friction;
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce with elasticity
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -0.8;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -0.8;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Gentle gravity toward center
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 300) {
                particle.vx += (dx / distance) * 0.02;
                particle.vy += (dy / distance) * 0.02;
            }
            
            // Speed limit
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 3.5) {
                particle.vx = (particle.vx / speed) * 3.5;
                particle.vy = (particle.vy / speed) * 3.5;
            }
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            particle.trail.forEach((point, index) => {
                const alpha = (index / particle.trail.length) * 0.25;
                const colorMatch = particle.color.match(/[\d.]+/g);
                const r = colorMatch[0], g = colorMatch[1], b = colorMatch[2];
                this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, particle.radius * 0.4, 0, Math.PI * 2);
                this.ctx.fill();
            });
            
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawConnections() {
        // Particle-to-particle connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 140) {
                    const opacity = 0.25 * (1 - distance / 140);
                    this.ctx.strokeStyle = `rgba(150, 150, 150, ${opacity})`;
                    this.ctx.lineWidth = 0.9;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
            
            // Particle-to-node connections
            this.nodes.forEach(node => {
                const dx = this.particles[i].x - node.x;
                const dy = this.particles[i].y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 220) {
                    const opacity = 0.12 * (1 - distance / 220);
                    const isRed = node.color === '#dc2626';
                    this.ctx.strokeStyle = isRed ? `rgba(220, 38, 38, ${opacity})` : `rgba(150, 150, 150, ${opacity})`;
                    this.ctx.lineWidth = 0.6;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(node.x, node.y);
                    this.ctx.stroke();
                }
            });
        }
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            node.pulseRadius = node.radius + Math.sin(this.time * node.pulseSpeed) * 4;
            node.offsetX = Math.cos(this.time * 0.0008) * 20;
            node.offsetY = Math.sin(this.time * 0.0006) * 20;
        });
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            const x = node.baseX + node.offsetX;
            const y = node.baseY + node.offsetY;
            
            // Enhanced glow
            const glowSize = node.pulseRadius * 5;
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, glowSize);
            gradient.addColorStop(0, node.color + '50');
            gradient.addColorStop(0.3, node.color + '25');
            gradient.addColorStop(1, node.color + '00');
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, glowSize, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Pulsing ring
            this.ctx.strokeStyle = node.color + '70';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, node.pulseRadius * 1.8, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Inner ring
            this.ctx.strokeStyle = node.color + '40';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(x, y, node.pulseRadius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Core node
            this.ctx.fillStyle = node.color;
            this.ctx.beginPath();
            this.ctx.arc(x, y, node.pulseRadius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawWaves() {
        for (let i = 0; i < 6; i++) {
            this.ctx.strokeStyle = `rgba(150, 150, 150, ${0.12 - i * 0.02})`;
            this.ctx.lineWidth = 1.2;
            this.ctx.beginPath();
            
            const centerY = this.canvas.height * (0.15 + i * 0.12);
            const waveHeight = 40;
            const waveLength = 180;
            
            for (let x = 0; x <= this.canvas.width; x += 8) {
                const y = centerY + Math.sin((x + this.time * 60) / waveLength) * waveHeight;
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
        }
    }
    
    animate() {
        this.time++;
        
        // Gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#fafbfc');
        gradient.addColorStop(1, '#ffffff');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw all elements
        this.drawWaves();
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        this.updateNodes();
        this.drawNodes();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroCanvas('heroCanvas');
});


