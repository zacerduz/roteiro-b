// data/tripData.js
// Base de dados completa da viagem a Florença

const TRIP_DATA = {
  // Informações gerais da viagem
  info: {
    destination: "Florença",
    country: "Itália",
    dates: {
      start: "2026-05-08",
      end: "2026-05-14"
    },
    accommodation: {
      name: "Appartamento Puliti",
      address: "P.za Puliti 11 (Lungarno del Tempio)",
      location: "Margem norte/leste do centro",
      checkIn: "14:00",
      coordinates: { lat: 43.7696, lng: 11.2658 }
    },
    mainStation: {
      name: "Firenze S. M. Novella (SMN)",
      toAccommodation: {
        taxi: "10-12 min",
        bus: "15-20 min",
        walk: "25-30 min"
      }
    }
  },

  // Distâncias a pé a partir do apartamento
  walkingTimes: [
    { from: "Apartamento", to: "Santa Croce", time: "12-15 min" },
    { from: "Santa Croce", to: "Duomo", time: "10-12 min" },
    { from: "Duomo", to: "Accademia", time: "10-12 min" },
    { from: "Duomo/Signoria", to: "Uffizi/Ponte Vecchio", time: "6-10 min" },
    { from: "Apartamento", to: "SMN (a pé)", time: "25-30 min" },
    { from: "Apartamento", to: "SMN (ônibus)", time: "10-15 min" },
    { from: "Apartamento", to: "SMN (táxi)", time: "10-12 min" }
  ],

  // Reservas necessárias
  reservations: [
    {
      id: 1,
      attraction: "Galleria degli Uffizi",
      date: "2026-05-09",
      time: "09:00",
      status: "confirmed",
      notes: "Entrada fixa com ingresso comprado"
    },
    {
      id: 2,
      attraction: "Palazzo Pitti + Galeria Palatina",
      date: "2026-05-09",
      time: "15:00",
      status: "confirmed",
      notes: "Ingresso comprado"
    },
    {
      id: 3,
      attraction: "Jardins Boboli",
      date: "2026-05-09",
      time: "16:45",
      status: "confirmed",
      notes: "Ingresso comprado"
    },
    {
      id: 4,
      attraction: "Cúpula OU Campanile (Duomo)",
      date: "2026-05-12",
      time: "08:45-09:15",
      status: "pending",
      notes: "Escolher entre Cúpula ou Campanile - RESERVAR JÁ!"
    },
    {
      id: 5,
      attraction: "Galleria dell'Accademia (David)",
      date: "2026-05-12",
      time: "13:45-14:15",
      status: "pending",
      notes: "Ingresso cronometrado - RESERVAR JÁ!"
    }
  ],

  // Checklist de transportes
  transportChecklist: [
    {
      route: "Florença → Pisa → Lucca → Florença",
      date: "2026-05-10",
      type: "Trem Regional",
      status: "pending",
      notes: "Pode comprar na véspera"
    },
    {
      route: "Florença → Siena → Florença",
      date: "2026-05-11",
      type: "Ônibus Intermunicipal",
      status: "pending",
      notes: "Autostazione ao lado da SMN - usar app"
    },
    {
      route: "Florença → Veneza → Florença",
      date: "2026-05-13",
      type: "Trem Alta Velocidade (Frecciarossa/Italo)",
      status: "pending",
      notes: "Comprar ida cedo / volta fim de tarde"
    }
  ],

  // Itinerário completo por dia
  itinerary: [
    {
      day: 1,
      date: "2026-05-08",
      weekday: "Sexta-feira",
      title: "Ambientação + Santa Croce + Vistas no Oltrarno",
      theme: "arrival",
      periods: [
        {
          period: "Manhã",
          icon: "🌅",
          activities: [
            {
              time: "Chegada",
              activity: "Chegada a SMN",
              location: "Estação Santa Maria Novella",
              duration: null,
              type: "transport"
            },
            {
              time: "Manhã",
              activity: "Atrações próximas à estação",
              location: "Zona SMN",
              duration: "2-3h",
              type: "sightseeing",
              details: [
                "Basílica Santa Maria Novella",
                "Cappelle Medicee",
                "Mercato Centrale (almoço)"
              ]
            }
          ]
        },
        {
          period: "Tarde",
          icon: "☀️",
          activities: [
            {
              time: "14:00",
              activity: "Check-in no hotel",
              location: "Appartamento Puliti",
              duration: "30 min",
              type: "accommodation",
              details: ["Deixar malas", "Pausa curta"]
            },
            {
              time: "14:30-15:30",
              activity: "Basílica de Santa Croce",
              location: "Piazza Santa Croce",
              duration: "45-60 min",
              type: "attraction",
              walkTime: "12-15 min do apto"
            },
            {
              time: "15:45-16:15",
              activity: "Gelato/Café",
              location: "Via dei Neri",
              duration: "30 min",
              type: "food"
            }
          ]
        },
        {
          period: "Noite",
          icon: "🌙",
          activities: [
            {
              time: "17:15-17:30",
              activity: "Atravessar para Oltrarno",
              location: "Ponte alle Grazie/Vecchio",
              duration: "15 min",
              type: "walk"
            },
            {
              time: "18:00-19:30",
              activity: "Pôr do sol no Piazzale Michelangelo",
              location: "Piazzale Michelangelo",
              duration: "1h30",
              type: "viewpoint",
              highlight: true,
              tips: "Subir de táxi/ônibus e descer a pé (poupa pernas)"
            },
            {
              time: "20:00-21:30",
              activity: "Jantar no Oltrarno",
              location: "Santo Spirito/San Niccolò",
              duration: "1h30",
              type: "food",
              tips: "Caminho de volta pelo Lungarno"
            }
          ]
        }
      ]
    },
    {
      day: 2,
      date: "2026-05-09",
      weekday: "Sábado",
      title: "Uffizi + Pitti/Ateliês",
      theme: "art",
      periods: [
        {
          period: "Manhã",
          icon: "🌅",
          activities: [
            {
              time: "08:00",
              activity: "Café da manhã",
              location: "Pasticceria Nencioni (sugestão)",
              duration: "45 min",
              type: "food"
            },
            {
              time: "08:45-11:15",
              activity: "Galleria degli Uffizi",
              location: "Piazzale degli Uffizi",
              duration: "2h30",
              type: "museum",
              highlight: true,
              reservation: true
            },
            {
              time: "11:15-12:00",
              activity: "Piazza della Signoria",
              location: "Piazza della Signoria",
              duration: "45 min",
              type: "sightseeing",
              details: ["Loggia dei Lanzi", "Palazzo Vecchio (exterior)"]
            }
          ]
        },
        {
          period: "Almoço",
          icon: "🍝",
          activities: [
            {
              time: "12:00-13:15",
              activity: "Almoço",
              location: "Arredores Santa Croce/Oltrarno",
              duration: "1h15",
              type: "food",
              tips: "Evite beira-Arno mais turística"
            }
          ]
        },
        {
          period: "Tarde",
          icon: "☀️",
          activities: [
            {
              time: "13:30-14:45",
              activity: "Ateliês e artesanato",
              location: "Oltrarno (Via Maggio, Borgo San Jacopo)",
              duration: "1h15",
              type: "shopping"
            },
            {
              time: "15:00-16:30",
              activity: "Palazzo Pitti",
              location: "Piazza de' Pitti",
              duration: "1h30",
              type: "museum",
              highlight: true,
              reservation: true,
              details: ["Galeria Palatina", "Apartamentos Reais"]
            },
            {
              time: "16:45-18:00",
              activity: "Jardins Boboli",
              location: "Giardino di Boboli",
              duration: "1h15",
              type: "garden",
              reservation: true
            }
          ]
        },
        {
          period: "Noite",
          icon: "🌙",
          activities: [
            {
              time: "18:30-20:00",
              activity: "Aperitivo + Jantar",
              location: "Santo Spirito",
              duration: "1h30",
              type: "food",
              tips: "Retorno pelo Lungarno"
            }
          ]
        }
      ]
    },
    {
      day: 3,
      date: "2026-05-10",
      weekday: "Domingo",
      title: "Pisa + Lucca (Bate e volta)",
      theme: "daytrip",
      periods: [
        {
          period: "Manhã - Pisa",
          icon: "🏛️",
          activities: [
            {
              time: "07:40-08:45",
              activity: "Trem para Pisa",
              location: "SMN → Pisa Centrale",
              duration: "~1h",
              type: "transport"
            },
            {
              time: "09:15-11:15",
              activity: "Pisa",
              location: "Piazza dei Miracoli",
              duration: "2h",
              type: "sightseeing",
              highlight: true,
              details: [
                "Exterior da Praça",
                "Catedral (30 min)",
                "Batistério (20 min)",
                "Torre: opcional (reserva/35-40 min)"
              ],
              walkTime: "20-25 min da estação (a pé/ônibus)"
            }
          ]
        },
        {
          period: "Tarde - Lucca",
          icon: "🚴",
          activities: [
            {
              time: "11:45-12:20",
              activity: "Trem para Lucca",
              location: "Pisa → Lucca",
              duration: "30-35 min",
              type: "transport"
            },
            {
              time: "12:30-13:30",
              activity: "Almoço em Lucca",
              location: "Centro de Lucca",
              duration: "1h",
              type: "food",
              tips: "Menos turístico que Pisa"
            },
            {
              time: "13:45-17:00",
              activity: "Explorar Lucca",
              location: "Centro histórico",
              duration: "3h15",
              type: "sightseeing",
              highlight: true,
              details: [
                "Bike nas muralhas (60-90 min)",
                "Torre Guinigi (subida 20-25 min)",
                "Duomo",
                "Piazza dell'Anfiteatro"
              ]
            }
          ]
        },
        {
          period: "Noite",
          icon: "🌙",
          activities: [
            {
              time: "17:15-18:35",
              activity: "Trem de retorno",
              location: "Lucca → SMN",
              duration: "~1h20",
              type: "transport"
            },
            {
              time: "19:30",
              activity: "Jantar leve",
              location: "Perto do apartamento",
              duration: "1h",
              type: "food"
            }
          ]
        }
      ]
    },
    {
      day: 4,
      date: "2026-05-11",
      weekday: "Segunda-feira",
      title: "Siena (Bate e volta)",
      theme: "daytrip",
      periods: [
        {
          period: "Manhã",
          icon: "🚌",
          activities: [
            {
              time: "08:30-09:45",
              activity: "Ônibus para Siena",
              location: "Autostazione (lado SMN) → Siena",
              duration: "~1h15",
              type: "transport"
            },
            {
              time: "10:00-13:00",
              activity: "Explorar Siena",
              location: "Centro histórico",
              duration: "3h",
              type: "sightseeing",
              highlight: true,
              details: [
                "Piazza del Campo",
                "Duomo (45-60 min)",
                "Mirantes na Via di Città"
              ]
            }
          ]
        },
        {
          period: "Almoço",
          icon: "🍝",
          activities: [
            {
              time: "13:00-14:00",
              activity: "Almoço",
              location: "Centro histórico de Siena",
              duration: "1h",
              type: "food"
            }
          ]
        },
        {
          period: "Tarde",
          icon: "☀️",
          activities: [
            {
              time: "14:15-15:15",
              activity: "Santa Maria della Scala (opcional)",
              location: "Piazza del Duomo",
              duration: "1h",
              type: "museum",
              tips: "Ou passeio sem pressa"
            },
            {
              time: "15:30-16:45",
              activity: "Retorno a Florença",
              location: "Siena → SMN",
              duration: "~1h15",
              type: "transport"
            }
          ]
        },
        {
          period: "Noite",
          icon: "🌙",
          activities: [
            {
              time: "19:30",
              activity: "Jantar tranquilo",
              location: "Florença",
              duration: "1h30",
              type: "food"
            }
          ]
        }
      ]
    },
    {
      day: 5,
      date: "2026-05-12",
      weekday: "Terça-feira",
      title: "Triângulo Clássico: Duomo + Accademia + Centro Medieval",
      theme: "classic",
      periods: [
        {
          period: "Manhã",
          icon: "⛪",
          activities: [
            {
              time: "08:00",
              activity: "Café da manhã",
              location: "Mercato Sant'Ambrogio",
              duration: "30 min",
              type: "food",
              tips: "Menor que o central; frequentado por locais; rumo do hotel"
            },
            {
              time: "08:30-11:30",
              activity: "Complexo do Duomo",
              location: "Piazza del Duomo",
              duration: "3h",
              type: "attraction",
              highlight: true,
              reservation: true,
              details: [
                "Catedral",
                "Batistério",
                "Museu dell'Opera",
                "Subida: Cúpula OU Campanile (08:45-09:15)"
              ],
              tips: "Evite combinar com outras subidas no dia"
            }
          ]
        },
        {
          period: "Almoço",
          icon: "🍝",
          activities: [
            {
              time: "12:00-13:15",
              activity: "Almoço",
              location: "Arredores do Duomo",
              duration: "1h15",
              type: "food"
            }
          ]
        },
        {
          period: "Tarde",
          icon: "🎨",
          activities: [
            {
              time: "13:45-15:00",
              activity: "Galleria dell'Accademia (David)",
              location: "Via Ricasoli",
              duration: "60-75 min",
              type: "museum",
              highlight: true,
              reservation: true
            },
            {
              time: "15:10-16:00",
              activity: "Igreja de Orsanmichele",
              location: "Via Calzaiuoli",
              duration: "50 min",
              type: "attraction",
              tips: "Ou passeio Via Calzaiuoli no retorno ao eixo Duomo-Signoria"
            }
          ]
        },
        {
          period: "Noite",
          icon: "🌙",
          activities: [
            {
              time: "17:00-18:00",
              activity: "Fotos na Ponte Vecchio/Arno",
              location: "Ponte Vecchio",
              duration: "1h",
              type: "sightseeing"
            },
            {
              time: "19:30-21:30",
              activity: "Aperitivo + Jantar",
              location: "Centro/Oltrarno",
              duration: "2h",
              type: "food"
            }
          ]
        }
      ]
    },
    {
      day: 6,
      date: "2026-05-13",
      weekday: "Quarta-feira",
      title: "Veneza (Bate e volta)",
      theme: "daytrip",
      periods: [
        {
          period: "Manhã",
          icon: "🚄",
          activities: [
            {
              time: "07:20-09:30",
              activity: "Trem Alta Velocidade para Veneza",
              location: "SMN → Venezia S. Lucia",
              duration: "~2h05",
              type: "transport",
              details: ["Frecciarossa ou Italo"]
            },
            {
              time: "09:45-12:30",
              activity: "San Marco e arredores",
              location: "Centro de Veneza",
              duration: "2h45",
              type: "sightseeing",
              highlight: true,
              details: [
                "Rialto",
                "Basilica di San Marco",
                "Palazzo Ducale (exterior)",
                "Vistas no molo"
              ]
            }
          ]
        },
        {
          period: "Almoço",
          icon: "🍝",
          activities: [
            {
              time: "12:30-13:30",
              activity: "Almoço",
              location: "Dorsoduro/Castello",
              duration: "1h",
              type: "food",
              tips: "Fugir do pico turístico"
            }
          ]
        },
        {
          period: "Tarde",
          icon: "🛶",
          activities: [
            {
              time: "13:45-17:30",
              activity: "Explorar Dorsoduro",
              location: "Dorsoduro",
              duration: "3h45",
              type: "sightseeing",
              details: [
                "Zattere",
                "Ponte dell'Accademia",
                "Galerias/ateliês"
              ],
              tips: "Opcional: vaporetto pelo Grande Canal (sentido Santa Lucia ao pôr do sol)"
            }
          ]
        },
        {
          period: "Noite",
          icon: "🌙",
          activities: [
            {
              time: "18:30-20:40",
              activity: "Trem de retorno",
              location: "Venezia S. Lucia → SMN",
              duration: "~2h10",
              type: "transport"
            }
          ]
        }
      ]
    },
    {
      day: 7,
      date: "2026-05-14",
      weekday: "Quinta-feira",
      title: "Partida",
      theme: "departure",
      periods: [
        {
          period: "Manhã",
          icon: "✈️",
          activities: [
            {
              time: "A definir",
              activity: "Check-out e partida",
              location: "Appartamento Puliti",
              duration: null,
              type: "departure"
            }
          ]
        }
      ]
    }
  ],

  // Pontos de interesse categorizados
  attractions: {
    museums: [
      {
        name: "Galleria degli Uffizi",
        zone: "Centro/Signoria",
        mustSee: true,
        reservationRequired: true
      },
      {
        name: "Galleria dell'Accademia",
        zone: "San Marco",
        mustSee: true,
        reservationRequired: true,
        highlight: "David de Michelangelo"
      },
      {
        name: "Palazzo Pitti",
        zone: "Oltrarno",
        mustSee: true,
        reservationRequired: true
      },
      {
        name: "Museu dell'Opera del Duomo",
        zone: "Duomo",
        mustSee: true,
        reservationRequired: false
      }
    ],
    churches: [
      {
        name: "Duomo (Santa Maria del Fiore)",
        zone: "Duomo",
        mustSee: true
      },
      {
        name: "Basílica de Santa Croce",
        zone: "Santa Croce",
        mustSee: true
      },
      {
        name: "Basílica Santa Maria Novella",
        zone: "SMN",
        mustSee: false
      },
      {
        name: "Igreja de Orsanmichele",
        zone: "Centro",
        mustSee: false
      }
    ],
    viewpoints: [
      {
        name: "Piazzale Michelangelo",
        zone: "Oltrarno",
        mustSee: true,
        highlight: "Melhor pôr do sol"
      },
      {
        name: "Cúpula do Duomo",
        zone: "Duomo",
        mustSee: true,
        reservationRequired: true
      },
      {
        name: "Campanile di Giotto",
        zone: "Duomo",
        mustSee: true,
        reservationRequired: true
      }
    ],
    landmarks: [
      { name: "Ponte Vecchio", zone: "Centro/Arno", mustSee: true },
      { name: "Piazza della Signoria", zone: "Centro", mustSee: true },
      { name: "Palazzo Vecchio", zone: "Centro", mustSee: true },
      { name: "Batistério", zone: "Duomo", mustSee: true }
    ],
    gardens: [
      {
        name: "Jardins Boboli",
        zone: "Oltrarno",
        mustSee: true,
        reservationRequired: true
      }
    ]
  },

  // Sugestões gastronômicas
  foodTips: [
    {
      type: "Café da manhã",
      suggestions: ["Pasticceria Nencioni", "Mercato Sant'Ambrogio"]
    },
    {
      type: "Almoço",
      zones: ["Sant'Ambrogio", "Oltrarno", "Santa Croce"],
      tips: "Evite restaurantes colados às praças mais famosas"
    },
    {
      type: "Jantar",
      zones: ["Santo Spirito", "San Niccolò", "Oltrarno"],
      tips: "Reservar D-1/D-2 para restaurantes no Oltrarno"
    },
    {
      type: "Gelato",
      suggestions: ["Via dei Neri"]
    }
  ],

  // Dicas gerais
  tips: [
    {
      category: "Reservas",
      items: [
        "Chegue 15-20 min antes dos horários marcados",
        "Reserve Cúpula OU Campanile com antecedência",
        "Accademia requer ingresso cronometrado"
      ]
    },
    {
      category: "Clima",
      items: [
        "Em caso de chuva: priorize interiores (Pitti/Uffizi/Museu do Duomo)",
        "Deixe jardins/vistas para janelas secas"
      ]
    },
    {
      category: "Deslocamento",
      items: [
        "A pé entre 8-20 min na maior parte dos trechos",
        "SMN/apto via táxi/ônibus quando necessário",
        "Subir Piazzale de táxi/ônibus e descer a pé"
      ]
    },
    {
      category: "Alimentação",
      items: [
        "Evite restaurantes colados às praças famosas",
        "Busque ruas secundárias em Sant'Ambrogio/Oltrarno",
        "Pausas de almoço 60-75 min recomendadas"
      ]
    }
  ]
};

// Exportar para uso no app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TRIP_DATA;
}
