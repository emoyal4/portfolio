'use strict'

var gBooks
var STORAGE_KEY = 'books'
var gNextId = 0
var PAGE_SIZE = 5
var gPageIdx = 0

_createBookList()

function _createBookList() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = [
            { id: gNextId++, title: 'Harry Potter', price: 20, imgUrl: 'img/1.jpg', rate: 5 },
            { id: gNextId++, title: 'The Hobbit', price: 15, imgUrl: 'img/2.jpg', rate: 8 }
        ]
    }
    gBooks = books
    addToStorage(STORAGE_KEY, gBooks)
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(bookIdx, 1)
    addToStorage(STORAGE_KEY, gBooks)
}

// Another options is to start using a 3rd param for imgUrl and give it a default value
// imgUrl = 'img/no_cover.jpg'
function addBook(name, price) {
    var newBook = {
        id: gNextId++,
        title: name,
        price, // if the key and value have the same name we can shorten the syntax like this
        imgUrl: 'img/no_cover.jpg',
        rate: 0
    }
    gBooks.push(newBook)
    addToStorage(STORAGE_KEY, gBooks)
}

function updateBook(id, price) {
    var updatedBook = getBookById(id)
    updatedBook.price = price
    addToStorage(STORAGE_KEY, gBooks)
}

function getBookById(id) {
    return gBooks.find(function (book) {
        return book.id === id
    })
}

function updateRate(diff, id) {
    var book = getBookById(id)
    if (book.rate + diff > 10 || book.rate + diff < 0) return
    book.rate += diff
    addToStorage(STORAGE_KEY, gBooks)
}

function sortBooks(sortBy) {
    gBooks = gBooks.sort(function (bookA, bookB) {
        if (sortBy !== 'title') return bookA[sortBy] - bookB[sortBy]
        // Original solution:
        // var nameA = bookA.title.toLowerCase()
        // var nameB = bookB.title.toLowerCase()
        // if (nameA > nameB) return 1
        // if (nameA < nameB) return -1
        // return 0

        // New solution: Using localeCompare:
        return bookA.title.localeCompare(bookB.title)
    })
    addToStorage(STORAGE_KEY, gBooks)
}

function setPage(diff) {
    if (gPageIdx + diff > gBooks.length / PAGE_SIZE) return gPageIdx
    if (gPageIdx + diff < 0) return gPageIdx
    gPageIdx += diff
    return gPageIdx
}

