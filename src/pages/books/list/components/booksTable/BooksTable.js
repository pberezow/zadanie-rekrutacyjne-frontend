import React, { useEffect, useState } from 'react'
import { Divider, Grid, Header, Segment, Button, Icon, Table, Loader, Dimmer, Input } from 'semantic-ui-react'

import Locale from '../../../../../locale'
import { getBooks, getBooksFromToDate, handleApiError } from '../../../../../utils/api'

const BooksTable = props => {

    const {
        language,
        editBookOnClick,
        setGlobalErrorMessage,
        height = 'inherit'
    } = props

    const [books, setBooks] = useState([])
    const [filtered, setFiltered] = useState([])
    const [collected, setCollected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    const collectBooks = () => {
        setCollected(false)
        getBooks().then(res => {
                setBooks(res)
                setFiltered(res)
            })
            .then(setCollected(true))
            .catch(error => {
                setCollected(true)
                handleApiError(error, setGlobalErrorMessage, language)
            })
    }

    if (collected === false) {
        collectBooks()
    }

    const filterBooksByValue = (attribute) => {
        return event => setFiltered(books.filter(b => b[attribute] && b[attribute].startsWith(event.target.value)))
    }

    const filterBooksByDate = () => {
        setIsLoading(true)
        getBooksFromToDate(from, to)
            .then(results => {
                setFiltered(results)
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                handleApiError(error, setGlobalErrorMessage, language)
            })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            filterBooksByDate()
        }, 1500);

        return () => clearTimeout(timer);
      }, [from, to]);
    

    const createRow = row => {
        return (
            <Table.Row key={row.id} >
                <Table.Cell><Button onClick={() => editBookOnClick(row.id)} icon ><Icon name='edit' /></Button></Table.Cell>
                <Table.Cell>{row.author}</Table.Cell>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>{row.isbn}</Table.Cell>
                <Table.Cell>{row.published_date}</Table.Cell>
                <Table.Cell>{row.page_count}</Table.Cell>
                <Table.Cell>{row.language}</Table.Cell>
                <Table.Cell>{row.cover_url !== null ? <Button href={row.cover_url} icon><Icon name='image' /></Button> : ''}</Table.Cell>
            </Table.Row>
        )
    }

    return (
        <>
            <Divider hidden clearing section />
            <Grid centered verticalAlign="middle" textAlign="center">
                <Grid.Column>
                    <Header as="h2" 
                        color="teal" 
                        textAlign="center">
                        {Locale.t('pages.book_list.page_title', {locale: language})}
                    </Header>

                    <Segment stacked loading={!collected} >
                        
                        <Table celled >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>{Locale.t('pages.book_list.author', {locale: language})}</Table.HeaderCell>
                                    <Table.HeaderCell>{Locale.t('pages.book_list.title', {locale: language})}</Table.HeaderCell>
                                    <Table.HeaderCell>{Locale.t('pages.book_list.isbn', {locale: language})}</Table.HeaderCell>
                                    <Table.HeaderCell>{Locale.t('pages.book_list.published_date', {locale: language})}</Table.HeaderCell>
                                    <Table.HeaderCell>{Locale.t('pages.book_list.page_count', {locale: language})}</Table.HeaderCell>
                                    <Table.HeaderCell>{Locale.t('pages.book_list.language', {locale: language})}</Table.HeaderCell>
                                    <Table.HeaderCell>{Locale.t('pages.book_list.cover_url', {locale: language})}</Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell><Input placeholder={Locale.t('pages.book_list.author', {locale: language})} size='mini' onChange={filterBooksByValue('author')} /></Table.HeaderCell>
                                    <Table.HeaderCell><Input placeholder={Locale.t('pages.book_list.title', {locale: language})} size='mini' onChange={filterBooksByValue('title')} /></Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Input placeholder={Locale.t('general.from', {locale: language})} style={{maxWidth: '100px'}} size='mini' onChange={event => {setFrom(event.target.value)}} />
                                        <Input placeholder={Locale.t('general.to', {locale: language})} style={{maxWidth: '100px'}} size='mini' onClick={event => {setTo(event.target.value)}} />
                                    </Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell><Input size='mini' style={{maxWidth: '50px'}} onChange={filterBooksByValue('language')} /></Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Dimmer active={isLoading} inverted>
                                <Loader size='mini'>Loading</Loader>
                            </Dimmer> 
                            <Table.Body >{filtered.map(b => createRow(b))}</Table.Body>
                        </Table>

                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default BooksTable