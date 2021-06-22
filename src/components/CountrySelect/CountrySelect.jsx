import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import countries from 'constants/countries.json'
import { ReactComponent as ArrowDown } from 'assets/img/arrow-down-sign-to-navigate.svg'

import styles from './CountrySelect.module.css'

const CountrySelect = ({
  className,
  value,
  defaultValue,
  placeholder,
  onSelect
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen((prevState) => !prevState)

  // add the icon attribute to the each items and get selected and defaultSelected item
  const { items, selected, defaultSelected } = countries.reduce(
    (acc, item) => {
      const extendedItem = {
        ...item,
        icon: `https://www.countryflags.io/${String(
          item.code
        ).toLowerCase()}/flat/24.png`
      }

      return {
        items: [...(acc.items || []), extendedItem],
        selected:
          acc.selected || (extendedItem.code === value ? extendedItem : null),
        defaultSelected:
          acc.defaultSelected ||
          (extendedItem.code === defaultValue ? extendedItem : null)
      }
    },
    {
      items: [],
      selected: null,
      defaultSelected: null
    }
  )

  const selectedItem = selected || defaultSelected

  return (
    <Dropdown className={className} isOpen={dropdownOpen} toggle={toggle}>
      {/* Dropdown toggle button */}
      <DropdownToggle
        className="w-100 h-100 text-left position-relative text-dark px-3"
        outline>
        {selectedItem ? (
          <>
            <img src={selectedItem.icon} alt={selectedItem.code} />
            &nbsp;
            <span>{selectedItem.dial_code}</span>
          </>
        ) : (
          <span className="text-muted">{placeholder}</span>
        )}
        <span className={styles['custom-caret']}>
          <ArrowDown height={10} width={10} />
        </span>
      </DropdownToggle>
      {/* Dropdown menu */}
      <DropdownMenu
        container="body"
        modifiers={{
          setMaxHeight: {
            enabled: true,
            order: 890,
            fn: (data) => {
              return {
                ...data,
                styles: {
                  ...data.styles,
                  overflow: 'auto',
                  maxHeight: '240px'
                }
              }
            }
          }
        }}>
        {items.map((item, index) => {
          return (
            <Fragment key={item.code}>
              <DropdownItem
                onClick={() => {
                  if (onSelect) onSelect(item.code, item)
                }}
                active={selectedItem ? item.code === selectedItem.code : false}>
                <img src={item.icon} alt={item.code} />
                <span>{item.dial_code}</span>
              </DropdownItem>
              <DropdownItem divider />
            </Fragment>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}

CountrySelect.defaultProps = {
  placeholder: 'Select'
}

CountrySelect.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func
}

export default CountrySelect
