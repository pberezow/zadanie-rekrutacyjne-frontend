import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Form, Divider, Grid, Header, Button, Segment, Message, Icon } from "semantic-ui-react"
import Locale from "../../../../../locale"
import { addBook, handleApiError } from "../../../../../utils/api"
import { BOOKS_LIST_RESOURCE_PATH } from "../../../../../utils/apiPaths"
import { isDate, isNumericString, isUrl } from "../../../../../utils/validators"

const NewBookForm = props => {
    const history = useHistory()

    const {
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

    const [isLoading, setIsLoading] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')

    const hideErrorMessage = () => {
        setErrorMessage('')
    }

    const setStateAttribute = (attribute) => {
        return (value) => {
            if (value === '') value = null
            setState({...state, [attribute]: value})
        }
    }

    const fields = {
        author:{
            label: 'pages.book_add.author',
            onChange: setStateAttribute('author'),
        },
        title:{
            label: 'pages.book_add.title',
            onChange: setStateAttribute('title'),
        },
        publishedDate:{
            label: 'pages.book_add.published_date',
            onChange: setStateAttribute('published_date'),
        },
        isbn:{
            label: 'pages.book_add.isbn',
            onChange: setStateAttribute('isbn'),
        },
        pageCount:{
            label: 'pages.book_add.page_count',
            onChange: setStateAttribute('page_count'),
        },
        coverUrl:{
            label: 'pages.book_add.cover_url',
            onChange: setStateAttribute('cover_url'),
        },
        language:{
            label: 'pages.book_add.language',
            onChange: setStateAttribute('language'),
        }
    }

    const getField = (params) => {
        return (
            <Form.Input loading={isLoading}
                label={Locale.t(params.label, {locale: language})} 
                onChange={event => params.onChange(event.target.value)}
            />
        )
    }


    const executeAdd = () => {
        setIsLoading(true)
        if (validateForm()) {
            setStateAttribute('page_count')(parseInt(state.page_count))
            addBook(state)
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
                        {Locale.t('pages.book_add.page_title', {locale: language})}
                    </Header>

                    <Segment stacked >
                        <Form size='large' >
                                {Object.keys(fields).map(key => getField(fields[key]))}
                            
                            <Divider hidden />
                            
                            <Message hidden={errorMessage === ''} onDismiss={() => hideErrorMessage()} negative>
                                <Icon name="exclamation triangle" size="large" />
                                {errorMessage}
                            </Message>

                            
                            <Button color="teal" fluid size="large" loading={isLoading} onClick={event => executeAdd(event)}>
                                {Locale.t('general.submit', {locale: language})}
                            </Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default NewBookForm