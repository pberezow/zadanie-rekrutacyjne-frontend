export default {
    general: {
        ok: 'OK',
        return: 'Return',
        submit: 'Submit',
        error: 'Error',
        from: 'From',
        to: 'To',
        app_name: 'Books Management App'
    },
    error: {
        api_error: 'Error with api request.',
    },
    menu: {
        book_list: 'Book list',
        book_add: 'Add book',
        book_edit: 'Edit book',
        book_import: 'Import book'
    },
    set_language_flag: 'pl',
    pages: {
        main_page: {
            page_title: 'Home page'
        },
        book_list: {
            page_title: 'Book collection',
            author: 'Author',
            title: 'Title',
            published_date: 'Published',
            isbn: 'ISBN',
            page_count:'Pages count',
            cover_url: 'Cover',
            language: 'Language'
        },
        book_edit: {
            page_title: 'Edit book',
            author: 'Author',
            title: 'Title',
            published_date: 'Published',
            isbn: 'ISBN',
            page_count:'Page count',
            cover_url: 'Cover',
            language: 'Language'
        },
        book_add: {
            page_title: 'Add book',
            author: 'Author',
            title: 'Title',
            published_date: 'Published',
            isbn: 'ISBN',
            page_count:'Page count',
            cover_url: 'Cover',
            language: 'Language'
        },
        book_import: {
            page_title: 'Import books',
            query: 'Keywords'
        }
    },
    validation: {
        author: '[Error] Author: maximum number of characters - 50',
        title: '[Error] Title: maximum number of characters - 100',
        published_date: '[Error] Published: incorrect value - expected YYYY-MM-DD',
        isbn: '[Error] ISBN: incorrect value - must have 10 or 13 digits',
        page_count: '[Error] Page count: must be a number greater or equal to 0',
        cover_url: '[Error] Cover: incorrect value - expected URL',
        language: '[Error] Language: incorrect value - expected ISO 639-1 code'
    },
    message: {
        set_language: 'Polski',
        api_error: 'Unexpected server error, try again later.'
    }
}