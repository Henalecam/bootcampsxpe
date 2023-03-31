class WcRelogio extends HTMLElement {
  constructor() {
    super();
    this.tipo = this.getAttribute('tipo') || 'digital';
    this.hora = 0;
    this.minuto = 0;
    this.segundo = 0;
    this.render();
  }

  connectedCallback() {
    this.atualizarHora();
  }

  atualizarHora() {
    const agora = new Date();
    this.hora = agora.getHours();
    this.minuto = agora.getMinutes();
    this.segundo = agora.getSeconds();
    this.render();
    setTimeout(() => this.atualizarHora(), 1000);
  }

  formatarNumero(numero) {
    return numero < 10 ? `0${numero}` : numero;
  }

  renderDigital() {
    return `
      <div>
        ${this.formatarNumero(this.hora)}:${this.formatarNumero(
      this.minuto
    )}:${this.formatarNumero(this.segundo)}
      </div>
    `;
  }

  renderAnalogico() {
    const raio = 45;
    const centroX = 50;
    const centroY = 50;
    const anguloHora = (this.hora % 12) * 30 + this.minuto / 2;
    const anguloMinuto = this.minuto * 6;
    const anguloSegundo = this.segundo * 6;

    return `
      <svg viewBox="0 0 100 100">
        <circle cx="${centroX}" cy="${centroY}" r="${raio}" stroke="black" fill="transparent"/>
        <line x1="${centroX}" y1="${centroY}" x2="${
      centroX + raio * Math.sin((anguloHora * Math.PI) / 180)
    }" y2="${
      centroY - raio * Math.cos((anguloHora * Math.PI) / 180)
    }" stroke="black" stroke-width="2"/>
        <line x1="${centroX}" y1="${centroY}" x2="${
      centroX + raio * Math.sin((anguloMinuto * Math.PI) / 180)
    }" y2="${
      centroY - raio * Math.cos((anguloMinuto * Math.PI) / 180)
    }" stroke="black" stroke-width="4"/>
        <line x1="${centroX}" y1="${centroY}" x2="${
      centroX + raio * Math.sin((anguloSegundo * Math.PI) / 180)
    }" y2="${
      centroY - raio * Math.cos((anguloSegundo * Math.PI) / 180)
    }" stroke="red" stroke-width="4"/>
      </svg>
    `;
  }

  render() {
    this.innerHTML =
      this.tipo === 'analogico' ? this.renderAnalogico() : this.renderDigital();
  }
}

customElements.define('wc-relogio', WcRelogio);
