// Seleciona elementos HTML com classes específicas
const pokemonName = document.querySelector('.pokemon__name')
const pokemomNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

// Variável para armazenar o número do Pokémon a ser buscado
let searchPokemon = 1

// Função assíncrona para buscar informações de um Pokémon na API
const fetchPokemon = async pokemon => {
  // Faz uma requisição para a API do Pokémon com o número do Pokémon
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  // Verifica se a requisição teve sucesso
  if (APIResponse.status === 200) {
    // Extrai e retorna os dados da resposta da API
    const data = await APIResponse.json()
    return data
  }
}

// Função assíncrona para renderizar as informações de um Pokémon na página
const renderPokemon = async pokemon => {
  // Define o texto de carregamento enquanto busca as informações do Pokémon
  pokemonName.innerHTML = 'Loading....'
  pokemomNumber.innerHTML = ''

  // Busca as informações do Pokémon na API
  const data = await fetchPokemon(pokemon)

  // Verifica se os dados foram encontrados
  if (data) {
    // Mostra a imagem do Pokémon e atualiza o nome e número do Pokémon na página
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name
    pokemomNumber.innerHTML = data.id
    // Define a imagem do Pokémon na página
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
    // Limpa o campo de busca e atualiza o número do Pokémon pesquisado
    input.value = ''
    searchPokemon = data.id
  } else {
    // Esconde a imagem do Pokémon e mostra uma mensagem de "não encontrado"
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Not found :('
    pokemomNumber.innerHTML = ''
  }
}

// Adiciona um listener para o evento "submit" no formulário de busca
form.addEventListener('submit', event => {
  // Impede que o formulário seja submetido normalmente (recarregando a página)
  event.preventDefault()
  // Renderiza as informações do Pokémon pesquisado (em minúsculas para garantir compatibilidade)
  renderPokemon(input.value.toLowerCase())
})

// Adiciona um listener para o evento "click" no botão de "anterior"
buttonPrev.addEventListener('click', () => {
  // Verifica se o número do Pokémon pesquisado é maior que 1
  if (searchPokemon > 1) {
    // Decrementa o número do Pokémon pesquisado e renderiza suas informações
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

// Adiciona um listener para o evento "click" no botão de "próximo"
buttonNext.addEventListener('click', () => {
  // Incrementa o número do Pokémon pesquisado e renderiza suas informações
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

// Renderiza as informações do Pokémon inicialmente (com número 1)
renderPokemon(searchPokemon)
