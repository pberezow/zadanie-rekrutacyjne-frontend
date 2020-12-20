import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Form, Divider, Grid, Header, Button, Segment, Message, Icon } from "semantic-ui-react"
import Locale from "../../../../../locale"
import { editBookById, getBookById, handleApiError } from "../../../../../utils/api"
import { BOOKS_LIST_RESOURCE_PATH } from "../../../../../utils/apiPaths"
import { HOME_PAGE_PATH } from "../../../../../utils/paths"
import { isDate, isNumericString, isUrl } from "../../../../../utils/validators"

const EditBookForm = props => {
    const history = useHistory()

    const {
        bookId = null,
        language,
        setGlobalErrorMessage,
        formWidth = 550,
        height = 'inherit',
    } = props

    const [state, setState] = useState({
        author: null,
        title: null,
        published_date: null,
        isbn: null,
        page_count: null,
        cover_url: null,
        language: null
    })

    const [isLoading, setIsLoading] = useState(true)
    const [collected, setCollected] = useState(false)

    const setStateAttribute = (attribute) => {
        console.log(state)
        return (value) => {
            if (value === '') value = null
            setState({...state, [attribute]: value})
        }
    }

    const [errorMessage, setErrorMessage] = useState('')

    const hideErrorMessage = () => {
        setErrorMessage('')
    }

    // placeholder does not work
    const fields = {
        author:{
            label: 'pages.book_edit.author',
            onChange: setStateAttribute('author'),
            placeholder: ''
        },
        title:{
            label: 'pages.book_edit.title',
            onChange: setStateAttribute('title'),
            placeholder: ''
        },
        publishedDate:{
            label: 'pages.book_edit.published_date',
            onChange: setStateAttribute('published_date'),
            placeholder: ''
        },
        isbn:{
            label: 'pages.book_edit.isbn',
            onChange: setStateAttribute('isbn'),
            placeholder: ''
        },
        pageCount:{
            label: 'pages.book_edit.page_count',
            onChange: setStateAttribute('page_count'),
            placeholder: ''
        },
        coverUrl:{
            label: 'pages.book_edit.cover_url',
            onChange: setStateAttribute('cover_url'),
            placeholder: ''
        },
        language:{
            label: 'pages.book_edit.language',
            onChange: setStateAttribute('language'),
            placeholder: ''
        }
    }

    const getField = (params) => {
        return (
            <Form.Input loading={!collected}
                label={Locale.t(params.label, {locale: language})} 
                onChange={event => params.onChange(event.target.value)}
                placeholder={params.placeholder}
            />
        )
    }

    if (!collected) {
        console.log(bookId)
        if (bookId === null || bookId === '') {
            history.push(HOME_PAGE_PATH)
            return
        }
        
        getBookById(bookId).then(book => {
            console.log(book)
            setState(
                {
                    author: book.author,
                    title: book.title,
                    published_date: book.published_date,
                    isbn: book.isbn,
                    page_count: String(book.page_count),
                    cover_url: book.cover_url,
                    language: book.language
                }
            )
            
            fields.author.placeholder = book.author
            fields.title.placeholder = book.title
            fields.publishedDate.placeholder = book.published_date
            fields.isbn.placeholder = book.isbn
            fields.pageCount.placeholder = book.pageCount
            fields.coverUrl.placeholder = book.cover_url
            fields.language.placeholder = book.language
            
            console.log(fields)
            setIsLoading(false)
            setCollected(true)
        })
        .catch(error => handleApiError(error, setGlobalErrorMessage, language))
    }

    const executeEdit = () => {
        setIsLoading(true)
        if (validateForm()) {
            setStateAttribute('page_count')(parseInt(state.page_count))
            editBookById(bookId, state)
                .then(result => {
                    if (result !== true) {
                        //error
                    }
                    history.push(BOOKS_LIST_RESOURCE_PATH)
                })
                .catch(error => handleApiError(error, setGlobalErrorMessage, language))
        } else {
            console.log('invalid form data')
            setIsLoading(false)
        }
    }

    const validateForm = () => {
        if (state.author === null || state.author.length <= 50) {
            // ok
        } else {
            setErrorMessage(Locale.t('validation.author', {locale: language}))
            return false
        }
        if (state.title !== null && state.title.length <= 100) {
            // ok
        } else {
            setErrorMessage(Locale.t('validation.title', {locale: language}))
            return false
        }
        if (state.published_date === null || (isDate(state.published_date) && state.published_date.length <= 10)) {
            // ok
        } else {
            setErrorMessage(Locale.t('validation.published_date', {locale: language}))
            return false
        }
        if (state.isbn === null || ( isNumericString(state.isbn) && (state.isbn.length === 10 || state.isbn.length === 13))) {
            // ok
        } else {
            setErrorMessage(Locale.t('validation.isbn', {locale: language}))
            return false
        }
        if (state.page_count === null || (isNumericString(state.page_count) && state.page_count.length < 6)) {
            // ok
        } else {
            setErrorMessage(Locale.t('validation.page_count', {locale: language}))
            return false
        }
        if (state.cover_url === null || (isUrl(state.cover_url) && state.cover_url.length < 150)) {
            // ok
        } else {
            setErrorMessage(Locale.t('validation.cover_url', {locale: language}))
            return false
        }
        if (state.language === null || state.language.length === 2) {
            // ok
        } else {
            setErrorMessage(Locale.t('validation.language', {locale: language}))
            return false
        }
        return true
    }

    return (
        <>
            <Divider hidden clearing section />
            <Grid centered verticalAlign="middle" style={{height}} textAlign="center">
                <Grid.Column style={{maxWidth: formWidth}}>
                    <Header as="h2" 
                        color="teal" 
                        textAlign="center">
                        {Locale.t('pages.book_edit.page_title')}
                    </Header>

                    <Segment stacked loading={!collected} >
                        <Form size='large' >
                                {Object.keys(fields).map(key => getField(fields[key]))}
                            
                            <Divider hidden />

                            <Message hidden={errorMessage === ''} onDismiss={() => hideErrorMessage()} negative>
                                <Icon name="exclamation triangle" size="large" />
                                {errorMessage}
                            </Message>
                            
                            <Button color="teal" fluid size="large" loading={isLoading} onClick={event => executeEdit(event)}>
                                {Locale.t('general.submit', {locale: language})}
                            </Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default EditBookForm