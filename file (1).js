// js/app.js
// Florença Trip Planner - Aplicação Principal

class FlorencaTripApp {
  constructor() {
    this.data = TRIP_DATA;
    this.currentSection = 'home';
    this.currentDay = 1;
    this.searchResults = [];
    
    this.init();
  }

  // ==========================================
  // INICIALIZAÇÃO
  // ==========================================
  init() {
    this.cacheDOM();
    this.bindEvents();
    this.renderHome();
    this.renderItinerary();
    this.renderReservations();
    this.renderTransport();
    this.renderAttractions();
    this.renderTips();
    this.renderDistances();
    this.renderFood();
    this.renderMap();
    
    // Exibir seção inicial
    this.showSection('home');
  }

  cacheDOM() {
    this.sections = document.querySelectorAll('.section');
    this.navTabs = document.querySelectorAll('.nav-tab');
    this.searchInput = document.getElementById('searchInput');
    this.searchResultsContainer = document.getElementById('searchResults');
    this.searchResultsList = document.getElementById('searchResultsList');
    this.searchResultsClose = document.getElementById('searchResultsClose');
    this.daysContainer = document.getElementById('daysContainer');
    this.dayCardsContainer = document.getElementById('dayCardsContainer');
  }

  bindEvents() {
    // Navegação por tabs
    this.navTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const section = e.currentTarget.dataset.section;
        this.showSection(section);
      });
    });

    // Busca
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });

    this.searchInput.addEventListener('focus', () => {
      if (this.searchInput.value.length >= 2) {
        this.showSearchResults();
      }
    });

    this.searchResultsClose.addEventListener('click', () => {
      this.hideSearchResults();
    });

    // Fechar busca ao clicar fora
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-search') && 
          !e.target.closest('.search-results')) {
        this.hideSearchResults();
      }
    });

    // Tecla Escape para fechar busca
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideSearchResults();
      }
    });
  }

  // ==========================================
  // NAVEGAÇÃO
  // ==========================================
  showSection(sectionId) {
    this.currentSection = sectionId;

    // Atualizar tabs
    this.navTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.section === sectionId);
    });

    // Mostrar seção
    this.sections.forEach(section => {
      section.classList.toggle('active', section.id === sectionId);
    });

    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // BUSCA
  // ==========================================
  handleSearch(query) {
    if (query.length < 2) {
      this.hideSearchResults();
      return;
    }

    const results = this.search(query.toLowerCase());
    this.renderSearchResults(results);
    this.showSearchResults();
  }

  search(query) {
    const results = [];

    // Buscar no itinerário
    this.data.itinerary.forEach(day => {
      day.periods.forEach(period => {
        period.activities.forEach(activity => {
          if (
            activity.activity.toLowerCase().includes(query) ||
            (activity.location && activity.location.toLowerCase().includes(query)) ||
            (activity.details && activity.details.some(d => d.toLowerCase().includes(query)))
          ) {
            results.push({
              type: 'itinerary',
              title: activity.activity,
              subtitle: activity.location,
              meta: `Dia ${day.day} - ${day.date} - ${period.period}`,
              day: day.day
            });
          }
        });
      });
    });

    // Buscar nas atrações
    Object.entries(this.data.attractions).forEach(([category, items]) => {
      items.forEach(item => {
        if (item.name.toLowerCase().includes(query)) {
          results.push({
            type: 'attraction',
            title: item.name,
            subtitle: item.zone,
            meta: category
          });
        }
      });
    });

    // Buscar nas reservas
    this.data.reservations.forEach(res => {
      if (res.attraction.toLowerCase().includes(query)) {
        results.push({
          type: 'reservation',
          title: res.attraction,
          subtitle: res.notes,
          meta: `${res.date} às ${res.time}`
        });
      }
    });

    return results.slice(0, 10); // Limitar a 10 resultados
  }

  renderSearchResults(results) {
    if (results.length === 0) {
      this.searchResultsList.innerHTML = `
        <div class="search-result-item">
          <p>Nenhum resultado encontrado</p>
        </div>
      `;
      return;
    }

    this.searchResultsList.innerHTML = results.map(result => `
      <div class="search-result-item" data-type="${result.type}" data-day="${result.day || ''}">
        <h5>${this.getTypeIcon(result.type)} ${result.title}</h5>
        <p>${result.subtitle || ''}</p>
        <div class="result-meta">
          <span>${result.meta}</span>
        </div>
      </div>
    `).join('');

    // Adicionar eventos de clique
    this.searchResultsList.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const type = item.dataset.type;
        const day = item.dataset.day;
        
        if (type === 'itinerary' && day) {
          this.showSection('itinerary');
          this.selectDay(parseInt(day));
        } else if (type === 'reservation') {
          this.showSection('reservations');
        } else if (type === 'attraction') {
          this.showSection('attractions');
        }
        
        this.hideSearchResults();
        this.searchInput.value = '';
      });
    });
  }

  getTypeIcon(type) {
    const icons = {
      itinerary: '📅',
      attraction: '🏛️',
      reservation: '🎫'
    };
    return icons[type] || '📍';
  }

  showSearchResults() {
    this.searchResultsContainer.classList.add('active');
  }

  hideSearchResults() {
    this.searchResultsContainer.classList.remove('active');
  }

  // ==========================================
  // RENDER: HOME
  // ==========================================
  renderHome() {
    const container = document.getElementById('homeContent');
    const info = this.data.info;
    const totalDays = this.data.itinerary.length;
    const pendingReservations = this.data.reservations.filter(r => r.status === 'pending').length;
    const confirmedReservations = this.data.reservations.filter(r => r.status === 'confirmed').length;

    container.innerHTML = `
      <div class="overview-grid">
        <!-- Card de Resumo -->
        <div class="overview-card">
          <h3>📊 Resumo da Viagem</h3>
          <p><span class="highlight">${totalDays} dias</span> de aventura na Toscana</p>
          <p>De <span class="highlight">${this.formatDate(info.dates.start)}</span></p>
          <p>Até <span class="highlight">${this.formatDate(info.dates.end)}</span></p>
          <div class="mt-1">
            <span class="badge badge-highlight">${this.data.itinerary.filter(d => d.theme === 'daytrip').length} Day Trips</span>
          </div>
        </div>

        <!-- Card de Acomodação -->
        <div class="overview-card accommodation-card">
          <h3>🏠 Hospedagem</h3>
          <p><span class="highlight">${info.accommodation.name}</span></p>
          <p>${info.accommodation.address}</p>
          <p>${info.accommodation.location}</p>
          <p class="mt-1">Check-in: <span class="highlight">${info.accommodation.checkIn}</span></p>
        </div>

        <!-- Card de Reservas -->
        <div class="overview-card">
          <h3>🎫 Status das Reservas</h3>
          <p><span class="highlight" style="color: var(--success);">✓ ${confirmedReservations} confirmadas</span></p>
          <p><span class="highlight" style="color: var(--warning);">⏳ ${pendingReservations} pendentes</span></p>
          ${pendingReservations > 0 ? '<p class="mt-1" style="color: var(--danger); font-weight: 600;">⚠️ Atenção: Reserve já!</p>' : ''}
        </div>

        <!-- Card de Transporte -->
        <div class="overview-card">
          <h3>🚆 Estação Principal</h3>
          <p><span class="highlight">${info.mainStation.name}</span></p>
          <p>Até o apartamento:</p>
          <ul style="list-style: none; margin-top: 0.5rem;">
            <li>🚕 Táxi: ${info.mainStation.toAccommodation.taxi}</li>
            <li>🚌 Ônibus: ${info.mainStation.toAccommodation.bus}</li>
            <li>🚶 A pé: ${info.mainStation.toAccommodation.walk}</li>
          </ul>
        </div>
      </div>

      <!-- Próximas Atividades em Destaque -->
      <h2 class="section-title">⭐ Destaques Imperdíveis</h2>
      <div class="overview-grid">
        ${this.getHighlightActivities().map(h => `
          <div class="overview-card" style="border-left-color: var(--accent);">
            <h3>${h.icon} ${h.title}</h3>
            <p>${h.description}</p>
            <p class="mt-1"><span class="highlight">Dia ${h.day}</span> - ${h.date}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  getHighlightActivities() {
    const highlights = [];
    
    this.data.itinerary.forEach(day => {
      day.periods.forEach(period => {
        period.activities.forEach(activity => {
          if (activity.highlight) {
            highlights.push({
              title: activity.activity,
              description: activity.location,
              day: day.day,
              date: this.formatDate(day.date),
              icon: this.getActivityIcon(activity.type)
            });
          }
        });
      });
    });

    return highlights.slice(0, 6);
  }

  getActivityIcon(type) {
    const icons = {
      transport: '🚆',
      attraction: '🏛️',
      food: '🍝',
      museum: '🎨',
      viewpoint: '🌅',
      accommodation: '🏠',
      shopping: '🛍️',
      walk: '🚶',
      garden: '🌳',
      sightseeing: '📸'
    };
    return icons[type] || '📍';
  }

  // ==========================================
  // RENDER: ITINERÁRIO
  // ==========================================
  renderItinerary() {
    // Renderizar seletor de dias
    this.daysContainer.innerHTML = this.data.itinerary.map(day => `
      <button class="day-btn ${day.day === 1 ? 'active' : ''}" data-day="${day.day}">
        <span class="day-number">Dia ${day.day}</span>
        <span class="day-date">${this.formatDateShort(day.date)}</span>
      </button>
    `).join('');

    // Adicionar eventos
    this.daysContainer.querySelectorAll('.day-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.selectDay(parseInt(e.currentTarget.dataset.day));
      });
    });

    // Renderizar primeiro dia
    this.renderDayCard(1);
  }

  selectDay(dayNumber) {
    this.currentDay = dayNumber;

    // Atualizar botões
    this.daysContainer.querySelectorAll('.day-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.day) === dayNumber);
    });

    // Renderizar card do dia
    this.renderDayCard(dayNumber);
  }

  renderDayCard(dayNumber) {
    const day = this.data.itinerary.find(d => d.day === dayNumber);
    if (!day) return;

    this.dayCardsContainer.innerHTML = `
      <div class="day-card">
        <div class="day-header theme-${day.theme}">
          <div class="day-header-content">
            <h2>Dia ${day.day}: ${day.title}</h2>
            <div class="day-meta">
              <span>📅 ${this.formatDate(day.date)}</span>
              <span>📆 ${day.weekday}</span>
            </div>
          </div>
        </div>
        <div class="day-periods">
          ${day.periods.map(period => this.renderPeriod(period)).join('')}
        </div>
      </div>
    `;
  }

  renderPeriod(period) {
    return `
      <div class="period-section">
        <div class="period-header">
          <span class="period-icon">${period.icon}</span>
          <h3>${period.period}</h3>
        </div>
        <div class="activities-list">
          ${period.activities.map(activity => this.renderActivity(activity)).join('')}
        </div>
      </div>
    `;
  }

  renderActivity(activity) {
    const highlightClass = activity.highlight ? 'highlight' : '';
    
    return `
      <div class="activity-item ${highlightClass}" data-type="${activity.type}">
        <div class="activity-time">${activity.time}</div>
        <div class="activity-content">
          <h4>
            ${this.getActivityIcon(activity.type)} ${activity.activity}
            ${activity.reservation ? '<span class="badge badge-reservation">Reserva</span>' : ''}
          </h4>
          ${activity.location ? `<div class="location">📍 ${activity.location}</div>` : ''}
          
          ${activity.details ? `
            <ul class="details">
              ${activity.details.map(d => `<li>• ${d}</li>`).join('')}
            </ul>
          ` : ''}
          
          ${activity.tips ? `
            <div class="tips">
              💡 ${activity.tips}
            </div>
          ` : ''}
          
          <div class="activity-badges">
            ${activity.duration ? `<span class="badge badge-duration">⏱️ ${activity.duration}</span>` : ''}
            ${activity.walkTime ? `<span class="badge badge-walk">🚶 ${activity.walkTime}</span>` : ''}
            ${activity.highlight ? `<span class="badge badge-highlight">⭐ Destaque</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // RENDER: RESERVAS
  // ==========================================
  renderReservations() {
    const container = document.getElementById('reservationsContent');
    
    container.innerHTML = `
      <div class="reservations-grid">
        ${this.data.reservations.map(res => `
          <div class="reservation-card status-${res.status}">
            <h4>🎫 ${res.attraction}</h4>
            <div class="reservation-meta">
              <span>📅 ${this.formatDate(res.date)}</span>
              <span>⏰ ${res.time}</span>
            </div>
            <div class="reservation-status ${res.status}">
              ${res.status === 'confirmed' ? '✓ Confirmada' : '⏳ Pendente'}
            </div>
            ${res.notes ? `<div class="reservation-notes">📝 ${res.notes}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // ==========================================
  // RENDER: TRANSPORTES
  // ==========================================
  renderTransport() {
    const container = document.getElementById('transportContent');
    
    container.innerHTML = `
      <div class="transport-list">
        ${this.data.transportChecklist.map(t => `
          <div class="transport-card">
            <div class="transport-icon">
              ${t.type.includes('Trem') ? '🚆' : '🚌'}
            </div>
            <div class="transport-info">
              <h4>${t.type}</h4>
              <div class="route">${t.route}</div>
              <div class="meta">
                <span>📅 ${this.formatDate(t.date)}</span>
                <span>📝 ${t.notes}</span>
              </div>
            </div>
            <div class="transport-status">
              <span class="reservation-status ${t.status}">
                ${t.status === 'confirmed' ? '✓ Comprado' : '⏳ Comprar'}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ==========================================
  // RENDER: ATRAÇÕES
  // ==========================================
  renderAttractions() {
    const container = document.getElementById('attractionsContent');
    const categories = Object.keys(this.data.attractions);
    
    container.innerHTML = `
      <div class="attractions-filter">
        <button class="filter-btn active" data-filter="all">Todas</button>
        ${categories.map(cat => `
          <button class="filter-btn" data-filter="${cat}">${this.getCategoryName(cat)}</button>
        `).join('')}
      </div>
      <div class="attractions-grid" id="attractionsGrid">
        ${this.renderAttractionCards('all')}
      </div>
    `;

    // Adicionar eventos de filtro
    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.dataset.filter;
        document.getElementById('attractionsGrid').innerHTML = this.renderAttractionCards(filter);
      });
    });
  }

  renderAttractionCards(filter) {
    let attractions = [];
    
    if (filter === 'all') {
      Object.entries(this.data.attractions).forEach(([cat, items]) => {
        items.forEach(item => attractions.push({ ...item, category: cat }));
      });
    } else {
      attractions = this.data.attractions[filter]?.map(item => ({ ...item, category: filter })) || [];
    }

    return attractions.map(attr => `
      <div class="attraction-card">
        <h4>${this.getCategoryIcon(attr.category)} ${attr.name}</h4>
        <div class="zone">📍 ${attr.zone}</div>
        ${attr.highlight ? `<div class="highlight-text">✨ ${attr.highlight}</div>` : ''}
        <div class="activity-badges mt-1">
          ${attr.mustSee ? '<span class="badge badge-highlight">Imperdível</span>' : ''}
          ${attr.reservationRequired ? '<span class="badge badge-reservation">Reserva</span>' : ''}
        </div>
      </div>
    `).join('');
  }

  getCategoryName(category) {
    const names = {
      museums: '🎨 Museus',
      churches: '⛪ Igrejas',
      viewpoints: '🌅 Mirantes',
      landmarks: '🏛️ Pontos',
      gardens: '🌳 Jardins'
    };
    return names[category] || category;
  }

  getCategoryIcon(category) {
    const icons = {
      museums: '🎨',
      churches: '⛪',
      viewpoints: '🌅',
      landmarks: '🏛️',
      gardens: '🌳'
    };
    return icons[category] || '📍';
  }

  // ==========================================
  // RENDER: DICAS
  // ==========================================
  renderTips() {
    const container = document.getElementById('tipsContent');
    
    container.innerHTML = `
      <div class="tips-grid">
        ${this.data.tips.map(tipCat => `
          <div class="tip-category">
            <h3>${this.getTipIcon(tipCat.category)} ${tipCat.category}</h3>
            <ul>
              ${tipCat.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
  }

  getTipIcon(category) {
    const icons = {
      'Reservas': '🎫',
      'Clima': '☀️',
      'Deslocamento': '🚶',
      'Alimentação': '🍝'
    };
    return icons[category] || '💡';
  }

  // ==========================================
  // RENDER: DISTÂNCIAS
  // ==========================================
  renderDistances() {
    const container = document.getElementById('distancesContent');
    
    container.innerHTML = `
      <div class="distances-table">
        <table>
          <thead>
            <tr>
              <th>De</th>
              <th>Para</th>
              <th>Tempo</th>
            </tr>
          </thead>
          <tbody>
            ${this.data.walkingTimes.map(wt => `
              <tr>
                <td>📍 ${wt.from}</td>
                <td>📍 ${wt.to}</td>
                <td class="time">🚶 ${wt.time}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // ==========================================
  // RENDER: GASTRONOMIA
  // ==========================================
  renderFood() {
    const container = document.getElementById('foodContent');
    
    container.innerHTML = `
      <div class="food-grid">
        ${this.data.foodTips.map(food => `
          <div class="food-card">
            <h4>${this.getFoodIcon(food.type)} ${food.type}</h4>
            
            ${food.suggestions ? `
              <div class="suggestions">
                ${food.suggestions.map(s => `<span class="suggestion-item">${s}</span>`).join('')}
              </div>
            ` : ''}
            
            ${food.zones ? `
              <div class="zones">
                <strong>Zonas recomendadas:</strong><br>
                ${food.zones.map(z => `<span class="zone-tag">${z}</span>`).join('')}
              </div>
            ` : ''}
            
            ${food.tips ? `<div class="tip">💡 ${food.tips}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  getFoodIcon(type) {
    const icons = {
      'Café da manhã': '☕',
      'Almoço': '🍝',
      'Jantar': '🍷',
      'Gelato': '🍨'
    };
    return icons[type] || '🍴';
  }

  // ==========================================
  // RENDER: MAPA
  // ==========================================
  renderMap() {
    const container = document.getElementById('mapContent');
    const coords = this.data.info.accommodation.coordinates;
    
    container.innerHTML = `
      <div class="map-container">
        <div class="map-placeholder">
          <div class="map-icon">🗺️</div>
          <h3>Mapa Interativo</h3>
          <p>Clique nos links abaixo para abrir no seu aplicativo de mapas preferido</p>
        </div>
        <div class="map-links">
          <a href="https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}" 
             target="_blank" class="map-link">
            🗺️ Google Maps
          </a>
          <a href="https://maps.apple.com/?q=${coords.lat},${coords.lng}" 
             target="_blank" class="map-link">
            🍎 Apple Maps
          </a>
          <a href="https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lng}&zoom=15" 
             target="_blank" class="map-link">
            🌍 OpenStreetMap
          </a>
        </div>
        
        <div class="mt-2">
          <h3 style="margin-bottom: 1rem;">📍 Locais Importantes</h3>
          <div class="map-links" style="flex-wrap: wrap;">
            <a href="https://www.google.com/maps/search/Piazza+del+Duomo+Firenze" 
               target="_blank" class="map-link" style="background: var(--cat-attraction);">
              ⛪ Duomo
            </a>
            <a href="https://www.google.com/maps/search/Galleria+degli+Uffizi+Firenze" 
               target="_blank" class="map-link" style="background: var(--cat-museum);">
              🎨 Uffizi
            </a>
            <a href="https://www.google.com/maps/search/Piazzale+Michelangelo+Firenze" 
               target="_blank" class="map-link" style="background: var(--cat-viewpoint);">
              🌅 Piazzale Michelangelo
            </a>
            <a href="https://www.google.com/maps/search/Ponte+Vecchio+Firenze" 
               target="_blank" class="map-link" style="background: var(--secondary);">
              🌉 Ponte Vecchio
            </a>
            <a href="https://www.google.com/maps/search/Santa+Maria+Novella+Station+Firenze" 
               target="_blank" class="map-link" style="background: var(--cat-transport);">
              🚆 Estação SMN
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // UTILITÁRIOS
  // ==========================================
  formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  formatDateShort(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  }
}

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.app = new FlorencaTripApp();
});
