class BookStoreRoutes {
    get_books = () => { return '/BookStore/v1/Books' }
    post_books = () => { return '/BookStore/v1/Books' }
    delete_books = () => { return '/BookStore/v1/Books' }
    get_book = () => { return '/BookStore/v1/Book' }
    delete_book = () => { return '/BookStore/v1/Book' }
    put_book = (ISBN) => { return `/BookStore/v1/Books/${ISBN}` }
}
  
export default BookStoreRoutes;