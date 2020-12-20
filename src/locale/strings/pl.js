export default {
    general: {
        ok: 'OK',
        return: 'Powrót',
        submit: 'Wyślij',
        error: 'Błąd',
        from: 'Od',
        to: 'Do',
        app_name: 'Books Management App'
    },
    error: {
        api_error: 'Błąd podczas zapytania api.',
    },
    menu: {
        book_list: 'Lista książek',
        book_add: 'Dodaj książkę',
        book_edit: 'Edytuj książkę',
        book_import: 'Importuj książki'
    },
    set_language_flag: 'gb',
    pages: {
        main_page: {
            page_title: 'Strona główna'
        },
        book_list: {
            page_title: 'Kolekcja książek',
            author: 'Autor',
            title: 'Tytuł',
            published_date: 'Rok wydania',
            isbn: 'ISBN',
            page_count:'Liczba stron',
            cover_url: 'Okładka',
            language: 'Język'
        },
        book_edit: {
            page_title: 'Dodaj książkę',
            author: 'Autor',
            title: 'Tytuł',
            published_date: 'Rok wydania',
            isbn: 'ISBN',
            page_count:'Liczba stron',
            cover_url: 'Okładka',
            language: 'Język'
        },
        book_add: {
            page_title: 'Edytuj książkę',
            author: 'Autor',
            title: 'Tytuł',
            published_date: 'Data wydania',
            isbn: 'ISBN',
            page_count:'Liczba stron',
            cover_url: 'Okładka',
            language: 'Język'
        },
        book_import: {
            page_title: 'Importuj książki',
            query: 'Słowa kluczowe'
        }
    },
    validation: {
        author: '[Błąd] Autor: maksymalna liczba znaków - 50',
        title: '[Błąd] Tytuł: maksymalna liczba znaków - 100',
        published_date: '[Błąd] Data wydania: błędny format - oczekiwany YYYY-MM-DD',
        isbn: '[Błąd] ISBN: błędny format - musi mieć 10 lub 13 cyfr',
        page_count: '[Błąd] Liczba stron: musi być liczbą większą lub równą 0',
        cover_url: '[Błąd] Okładka: błędny format - oczekiwany URL',
        language: '[Błąd] Język: błędny format - oczekiwany kod w formacie ISO 639-1'
    },
    message: {
        set_language: 'English',
        api_error: 'Nieoczekiwany błąd serwera, spróbuj ponownie później.'
    }
}