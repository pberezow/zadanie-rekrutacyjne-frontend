import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Divider, Form, Grid, Header, Segment, Button } from "semantic-ui-react"
import Locale from "../../../../../locale"
import { handleApiError, importBooks } from "../../../../../utils/api"
import { HOME_PAGE_PATH } from "../../../../../utils/paths"

const ImportBooksForm = props => {
    const history = useHistory()

    const {
        language,
        setGlobalErrorMessage,
        height = 'inherit'
    } = props

    const [isLoading, setIsLoading] = useState(false)
    const [query, setQuery] = useState('')

    const executeImport = () => {
        setIsLoading(true)
        importBooks(query)
            .then(setIsLoading(false))
            .then(history.push(HOME_PAGE_PATH))
            .catch(error => handleApiError(error, setGlobalErrorMessage, language))
    }

    const validateForm = () => {
        return true
    }

    return (
        <>
            <Divider hidden clearing section />
            <Grid centered verticalAlign="middle" style={{height}} textAlign="center">
                <Grid.Column>
                    <Header as="h2" 
                        color="teal" 
                        textAlign="center">
                        {Locale.t('pages.book_import.page_title')}
                    </Header>

                    <Segment stacked >
                        <Form size='large' >
                            <Form.Input
                                label={Locale.t('pages.book_import.query', {locale: language})} 
                                onChange={event => setQuery(event.target.value)}
                            />
    
                            <Divider hidden />
    
                            <Button color="teal" fluid size="large" loading={isLoading} onClick={event => executeImport(event)}>
                                {Locale.t('general.submit')}
                            </Button>
                        </Form>
                    </Segment>
          
                    </Grid.Column>
            </Grid>
        </>
    )
}

export default ImportBooksForm