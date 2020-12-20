import { useHistory, Route, Switch } from 'react-router-dom'
import { Container, Modal, Button, Icon, Header, Divider, Grid, Segment } from 'semantic-ui-react'
import { HOME_PAGE_PATH, BOOK_ADD_PAGE_PATH, BOOK_EDIT_PAGE_PATH, BOOK_IMPORT_PAGE_PATH, BOOK_LIST_PAGE_PATH } from '../../utils/paths'

import BooksListPage from '../../pages/books/list'
import BooksAddPage from '../../pages/books/add'
import BooksEditPage from '../../pages/books/edit'
import BooksImportPage from '../../pages/books/import'
import { useState } from 'react'
import Locale from '../../locale'


const MainContainer = ({children, footer, language}) => {
    const history = useHistory()

    const [selectedBookId, setSelectedBookId] = useState('')
    const [message, setMessage] = useState('')

    const editBookOnClick = (bookId) => {
        setSelectedBookId(bookId)
        history.push(BOOK_EDIT_PAGE_PATH)
    }

    const getMainPage = () => {
        return (
            <>
                <Divider hidden clearing section />
                <Grid centered verticalAlign="middle" textAlign="center">
                    <Grid.Column>
                        <Header as="h2" 
                            color="teal" 
                            textAlign="center">
                            {Locale.t('pages.main_page.page_title', {locale: language})}
                        </Header>
    
                        <Segment stacked >
                        
                        </Segment>
                    </Grid.Column>
                </Grid>
            </>
        )
    }    

    return (
        <Container style={{marginTop: '3.5rem', height: 'inherit'}}>

            <Modal
                closeOnEscape={true}
                closeOnDimmerClick={true}
                open={message !== ''}
                onClose={() => setMessage('')} 
            >
                <Modal.Header><Icon size='big' color='red' name='exclamation' />{Locale.t('general.error', {locale: language})}</Modal.Header>
                <Modal.Content>
                    <p>{message}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => {
                        setMessage('')
                        history.push(HOME_PAGE_PATH)
                    }} positive>
                        {Locale.t('general.ok', {locale: language})}
                    </Button>
                </Modal.Actions>
            </Modal>
            
            <Switch>
                <Route exact path={HOME_PAGE_PATH}>
                { getMainPage() }
                </Route>
    
                <Route exact path={BOOK_LIST_PAGE_PATH} >
                    <BooksListPage language={language} editBookOnClick={editBookOnClick} setGlobalErrorMessage={setMessage} />
                </Route>

                <Route exact path={BOOK_ADD_PAGE_PATH} >
                    <BooksAddPage language={language} setGlobalErrorMessage={setMessage} />
                </Route>

                <Route exact path={BOOK_EDIT_PAGE_PATH} >
                    <BooksEditPage bookId={selectedBookId} language={language} setGlobalErrorMessage={setMessage} />
                </Route>

                <Route exact path={BOOK_IMPORT_PAGE_PATH} >
                    <BooksImportPage language={language} setGlobalErrorMessage={setMessage} />
                </Route>
            </Switch>
    
        {children}
        {footer}
    
        </Container>
    )
}

export default MainContainer