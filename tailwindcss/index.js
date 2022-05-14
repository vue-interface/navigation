const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = plugin(function({ addComponents, theme }) {
    addComponents({
        // Base class
        //
        // Kickstart any navigation component with a set of style resets. Works with
        // `<nav>`s, `<ul>`s or `<ol>`s.

        '.nav': {
            display: 'flex',
            flexWrap: 'wrap',
            paddingLeft: 0,
            marginBottom: 0,
            listStyle: 'none'
        },
        
        '.nav-link': {
            display: 'block',
            padding: `${theme('navigation.paddingY')} ${theme('navigation.paddingX')}`,
            textDecoration: 'none',
            transition: theme('navigation.transition'),
        },
        
        '.nav-link:hover, .nav-link:focus': {
            textDecoration: 'none'
        },
        
        // Disabled state lightens text
        '.nav-link.disabled': {
            color: theme('navigation.disabled.color'),
            pointerEvents: 'none',
            cursor: 'default',
        },
        
        //
        // Tabs
        //
        
        '.nav-tabs': {
            borderBottom: `${theme('navigation.tabs.borderWidth')} solid ${theme('navigation.tabs.borderColor')}`,
        },

        '.nav-tabs .nav-link': {
            marginBottom: `-${theme('navigation.tabs.borderWidth')}`,
            border: `${theme('navigation.tabs.borderWidth')} solid transparent`,
            borderTopLeftRadius: theme('navigation.tabs.borderRadius'),
            borderTopRightRadius: theme('navigation.tabs.borderRadius'),
        },

        '.nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus': {
            borderColor: `${theme('navigation.tabs.hover.borderColor')} ${theme('navigation.tabs.hover.borderColor')} ${theme('navigation.tabs.borderColor')}`
        },
    
        '.nav-tabs .nav-link.disabled': {
            color: theme('navigation.disabled.color'),
            backgroundColor: 'transparent',
            borderColor: 'transparent'
        },
        
        '.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link': {
            color: theme('navigation.tabs.active.color'),
            backgroundColor: theme('navigation.tabs.active.backgroundColor'),
            borderColor: `${theme('navigation.tabs.active.borderColor')} ${theme('navigation.tabs.active.borderColor')} ${theme('navigation.tabs.active.backgroundColor')}`
        },
        
        '.nav-tabs .dropdown-menu': {
            // Make dropdown border overlap tab border
            marginTop: `-${theme('navigation.tabs.borderWidth')} !important`,
            // Remove the top rounded corners here since there is a hard edge above the menu
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },
        
        //
        // Pills
        //
        
        '.nav-pills .nav-link': {
            borderRadius: theme('navigation.pills.borderRadius')
        },
        
        '.nav-pills .nav-link.active, .nav-pills .show > .nav-link': {
            color: theme('navigation.pills.active.color'),
            backgroundColor: theme('navigation.pills.active.backgroundColor')
        },
        
        //
        // Justified variants
        //
        
        '.nav-fill .nav-item': {
            flex: '1 1 auto',
            textAlign: 'center'
        },
        
        '.nav-justified .nav-item': {
            flexBasis: 0,
            flexGrow: 1,
            textAlign: 'center',
        },
        
        // Tabbable tabs
        //
        // Hide tabbable panes to start, show them when `.active`

        '.tab-content > .tab-pane': {
            display: 'none'
        },

        '.tab-content > .active': {
            display: 'block'
        }
     
    });
}, {
    theme: {
        navigation: theme => ({
            paddingX: '1rem',
            paddingY: '.5rem',
            transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out',
            disabled: {
                color: theme('colors.gray.400', colors.gray['400']),
            },
            tabs: {
                borderColor: theme('colors.gray.300', colors.gray['300']),
                borderRadius: '.25rem',
                borderWidth: '1px',
                active: {
                    color: theme('colors.gray.700', colors.gray['700']),
                    backgroundColor: theme('colors.white', colors.white),
                    borderColor: theme('colors.gray.300', colors.gray['300']),
                },
                hover: {
                    borderColor: theme('colors.gray.300', colors.gray['300']),
                }
            },
            pills: {
                borderRadius: '.25rem',
                paddingY: '.5rem',
                active: {
                    color: theme('colors.white', colors.white),
                    backgroundColor: theme('variations', colors.sky['600']),
                }
            }
        })
    }
});