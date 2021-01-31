//  Dom-Load --Wszystkie potrzebne elementy
 const container = document.querySelector('ul.wyniki')
 const scoreInput = document.querySelector('input.priority')
 const nameInput = document.querySelector('input.name')
 const authorInput = document.querySelector('input.author')
 const select = document.querySelector('select')
 const addButton = document.querySelector('button.add')
 const form = document.querySelector('form')
 const ile = document.querySelector('h1.ile')
 const filtr = document.querySelector('select.filtr')
 const searchSelect = document.querySelector('select.searchSelect')
 const searchForm = document.querySelector('form.search')
 const searchInput = document.querySelector('input.searchInput')


// Definiuje store które może też byś w local storage
localStorage.getItem('books') ? store = JSON.parse(localStorage.getItem("books")) : store = []
// Ilość książek
ile.textContent = store && store.length
// Definiuje globalnie element
let element 


// Funkcja wysłania formularza
const handleSub = (editMode, event) => {
    event.preventDefault()
    const name = nameInput.value
    const author = authorInput.value
    const score = scoreInput.value
    if(!name || !author || !score) return alert('Wypełnij każde pole')
    // Wariacja funkcji, która służy do edytowania
    if(editMode) {
        container.innerHTML = ''
      const edited ={
    nameEdited: name,
    authorEdited: author,
    scoreEdited: score,
    ganreEdited: select.value
     }
     const newStore = [...store]
     const index = newStore.findIndex(item => item.id === editMode)
     newStore[index].name = edited.nameEdited
     newStore[index].author = edited.authorEdited
     newStore[index].ganre = edited.ganreEdited
     newStore[index].score = edited.scoreEdited
     store = newStore
     let newA = store.sort((a, b) => a.score - b.score)
     newA.reverse()
     store = newA
     store.map(item => {
      
        update(element, item, true)
      
    
        })
        localStorage.setItem('books', JSON.stringify(store))
      
    }
    // Właściwa funkcja do dodawania książki
    else {
    
        container.innerHTML = ''
    // Update tablicy obiektów
    store.push(
        {
        name: name,
        score: score,
        author: author,
        ganre: select.value,
        id: Math.random()
        }  
    )
    // Pozycjonowanie defaltowo względem punktacji 
    let newA = store.sort((a, b) => a.score - b.score)
    newA.reverse()
    store = newA
    // Najważniejsza funkcja do printowania elementów
    store.map(item => {
      
        update(element, item, true)
      
    
        })
    }
    // Aktualizacja localStoraga
    localStorage.setItem('books', JSON.stringify(store))
    }
    
    
    
    
    
    // Funkcaja do updatowania i printowania
    const update = (element, item, add) => {
        element = document.createElement('li')
        element.id = item.id
        const name = document.createElement('h2')
        name.textContent = item.name
        const author = document.createElement('h2')
        author.textContent = item.author
        const ganre = document.createElement('h2')
        ganre.textContent = item.ganre
        const score = document.createElement('h2')
        score.textContent = item.score
        const del = document.createElement('button')
        del.textContent = 'Usuń'
        const edit = document.createElement('button')
        edit.textContent = 'Edytuj'
    // Usuwanie elementu
        const handleDel = (id) => {
            if(id == element.id)  element.remove()
          
            const newStore = store.filter(item => item.id !== id)
            store = newStore
            ile.textContent = store.length
            localStorage.setItem('books', JSON.stringify(store))
         }
        //  Edycja poprzez wywołanie funkcji w trybie edycji
        const handleEdit = (id) => {
                    const editedInfo = handleSub(id, event)
                }
        // Część do właściwego printowania (można wyłączyć)     
    if(add) {
                element.appendChild(name)
                element.appendChild(author)
                element.appendChild(ganre)
                element.appendChild(score)
                element.appendChild(del)
                element.appendChild(edit)
                container.appendChild(element)
    }
    else return
    del.addEventListener('click', handleDel.bind(this, item.id))
    edit.addEventListener('click', handleEdit.bind(this, item.id))
    // update ilości książek
    ile.textContent = store.length
    }




    // Funkcja do sortowania względem kryteriów
 const handeleSelect = () => {
        container.innerHTML = ''
        let value = filtr.value
        console.log(value)
     
    if(value === 'author') {
      const storeRep = [...store].sort(function(a, b){
        if(a.author < b.author) { return -1; }
        if(a.author > b.author) { return 1; }
        return 0;
    })
    storeRep.map(item => {
       
        update(element, item, true)
      
    
        })
    }
    else if(value === 'ganre') {
        const storeRep = [...store].sort(function(a, b){
          if(a.ganre < b.ganre) { return -1; }
          if(a.ganre > b.ganre) { return 1; }
          return 0;
      })
      storeRep.map(item => {
         
          update(element, item, true)
        
      
          })
      }
      else if(value === 'score') {
        store.map(item => {
         
            update(element, item, true)
          
        
            })
      }
    
    else console.log('else?')
    }
    
    
    
    // Funkcja do wyszukiwania względem kategori i inputu
 const handleSearch = (e) => {
        e.preventDefault()
        container.innerHTML = ''
        let type = searchSelect.value
        console.log(type)
        const what = searchInput.value
        let storeRep = [...store]
        if(type ==='ganre') {
            storeRep = storeRep.filter(item => item.ganre == what)
            storeRep.map(item => {
         
                update(element, item, true)
              
            
                })
        }
        else if(type === 'score') {
        storeRep = storeRep.filter(item => item.score == what)
    
        storeRep.map(item => {
         
            update(element, item, true)
          
        
            })
        }
        else if(type === 'author') {
            storeRep = storeRep.filter(item => item.author == what)
            storeRep.map(item => {
         
                update(element, item, true)
              
            
                })
         
        }
        else {
            store.map(item => {
         
                update(element, item, true)
              
            
                })
        }
    }
    
    if(store.length>0) {
        store.map(item => {
      
            update(element, item, true)
          
        
            })
    }
    
    
// Wywoływanie
    document.querySelector('form.addBook').addEventListener('submit', handleSub.bind(null, event))
filtr.addEventListener('change', handeleSelect.bind(this))
searchForm.addEventListener('submit', handleSearch)