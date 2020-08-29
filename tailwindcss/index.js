const plugin = require('tailwindcss/plugin');
const { colors } = require('tailwindcss/defaultTheme');
const defaultVariations = require('@vue-interface/variant/tailwindcss');

const { flatten } = require('@vue-interface/tailwindcss');

module.exports = plugin(function({ addComponents, theme }) {
    const nav = {
        ':root': flatten(theme('nav')),

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
            padding: `${theme('nav.paddingY')} ${theme('nav.paddingX')}`,
            textDecoration: 'none',
            transition: theme('nav.transition'),
        },
        
        '.nav-link:hover, .nav-link:focus': {
            textDecoration: 'none'
        },
        
        // Disabled state lightens text
        '.nav-link.disabled': {
            color: theme('nav.disabled.color'),
            pointerEvents: 'none',
            cursor: 'default',
        },
        
        //
        // Tabs
        //
        
        '.nav-tabs': {
            borderBottom: `${theme('nav.tabs.borderWidth')} solid ${theme('nav.tabs.borderColor')}`,
        },

        '.nav-tabs .nav-link': {
            marginBottom: `-${theme('nav.tabs.borderWidth')}`,
            border: `${theme('nav.tabs.borderWidth')} solid transparent`,
            borderTopLeftRadius: theme('nav.tabs.borderRadius'),
            borderTopRightRadius: theme('nav.tabs.borderRadius'),
        },

        '.nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus': {
            borderColor: `${theme('nav.tabs.hover.borderColor')} ${theme('nav.tabs.hover.borderColor')} ${theme('nav.tabs.borderColor')}`
        },
    
        '.nav-tabs .nav-link.disabled': {
            color: theme('nav.disabled.color'),
            backgroundColor: 'transparent',
            borderColor: 'transparent'
        },
        
        '.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link': {
            color: theme('nav.tabs.active.color'),
            backgroundColor: theme('nav.tabs.active.backgroundColor'),
            borderColor: `${theme('nav.tabs.active.borderColor')} ${theme('nav.tabs.active.borderColor')} ${theme('nav.tabs.active.backgroundColor')}`
        },
        
        '.nav-tabs .dropdown-menu': {
            // Make dropdown border overlap tab border
            marginTop: `-${theme('nav.borderWidth')}`,
            // Remove the top rounded corners here since there is a hard edge above the menu
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },
        
        //
        // Pills
        //
        
        '.nav-pills .nav-link': {
            borderRadius: theme('nav.pills.borderRadius')
        },
        
        '.nav-pills .nav-link.active, .nav-pills .show > .nav-link': {
            color: theme('nav.pills.active.color'),
            backgroundColor: theme('nav.pills.active.backgroundColor')
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
     
    };
    
    addComponents(nav);
}, {
    theme: {
        nav: theme => ({
            paddingX: '1rem',
            paddingY: '.5rem',
            transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out',
            disabled: {
                color: theme('colors.gray.600', colors.gray[600]),
            },
            tabs: {
                borderColor: theme('colors.gray.300', colors.gray[300]),
                borderRadius: '.25rem',
                borderWidth: '1px',
                active: {
                    color: theme('colors.gray.700', colors.gray[700]),
                    backgroundColor: theme('colors.white', colors.white),
                    borderColor: theme('colors.gray.300', colors.gray[300]),
                },
                hover: {
                    borderColor: theme('colors.gray.300', colors.gray[300]),
                }
            },
            pills: {
                borderRadius: '.25rem',
                paddingY: '.5rem',
                active: {
                    color: theme('colors.white', colors.white),
                    backgroundColor: theme('variations.primary', defaultVariations.primary),
                }
            }
        })
    }
});