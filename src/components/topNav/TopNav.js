import React, { useEffect, useState } from 'react'

import {useHistory, useLocation} from 'react-router-dom'
import {Menu, Icon, Flag, Dropdown, Item} from 'semantic-ui-react'

import {HOME_PAGE_PATH, BOOK_LIST_PAGE_PATH, BOOK_ADD_PAGE_PATH,
    BOOK_EDIT_PAGE_PATH, BOOK_IMPORT_PAGE_PATH} from '../../utils/paths'

import './TopNav.css'
import Locale from '../../locale'

const TopNav = props => {
    const history = useHistory()
    const location = useLocation()

    const {
        language,
        setLanguage
    } = props

    const [dropdown, setDropdown] = useState(false)

    const redirect = path => {
        if (location.pathname !== path) {
            history.push(path)
        }
    }

    useEffect(() => {
        const handleResize = () => window.outerWidth < 600 ? setDropdown(true) : setDropdown(false)
        window.addEventListener('resize', handleResize)
    })

    const addDropdownItem = item => {
        return (
            <Dropdown.Item as="a" onClick={item.onClick}>
                <Icon name={item.icon} />
                {Locale.t(item.locale, {locale: language})}
            </Dropdown.Item>
        )
    }

    const addMenuItem = item => {
        return (
            <Menu.Item as="a" onClick={item.onClick}>
                <Icon name={item.icon} />
                {Locale.t(item.locale, {locale: language})}
            </Menu.Item>
        )
    }

    const setLanguageMenuItem = () => {
        return dropdown ?
            <Dropdown.Item as="a" onClick={() => setLanguage()}>
                <Flag name={Locale.t('set_language_flag', {locale: language})} />
                {Locale.t('message.set_language', {locale: language})}
            </Dropdown.Item>
            :
            <Menu.Item as="a" onClick={() => setLanguage()}>
                <Flag name={Locale.t('set_language_flag', {locale: language})} />
                {Locale.t('message.set_language', {locale: language})}
            </Menu.Item>
    }

    const menuItems = [
        {
            icon: 'table',
            onClick: () => redirect(BOOK_LIST_PAGE_PATH),
            locale: 'menu.book_list'
        },
        {
            icon: 'add',
            onClick: () => redirect(BOOK_ADD_PAGE_PATH),
            locale: 'menu.book_add'
        },
        {
            icon: 'cloud download',
            onClick: () => redirect(BOOK_IMPORT_PAGE_PATH),
            locale: 'menu.book_import'
        }
    ]

    const getMenu = () => {
        return dropdown ?
            <Dropdown item >
                <Dropdown.Menu>
                    {menuItems.map(item => addDropdownItem(item))}
                    {setLanguageMenuItem()}
                </Dropdown.Menu>
            </Dropdown>
            :
            <Menu.Menu position="right" >
                {menuItems.map(item => addMenuItem(item))}
                {setLanguageMenuItem()}
            </Menu.Menu>
    }
    
    return (
        <Menu fixed="top" inverted size="huge" id="topNav" stackable >
        {/* Logo placeholder */}
        <Menu.Item as="a" header className="NavLogo" onClick={() => redirect(HOME_PAGE_PATH)}>
            {Locale.t('general.app_name', {locale: language})}
        </Menu.Item>

        {/* Right menu */}
        {getMenu()}

    </Menu>
  )
}

export default TopNav