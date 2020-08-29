<script>
import { isUndefined } from '@vue-interface/utils';

function appendClass(vnode, str) {
    vnode.data.staticClass = `${vnode.data.staticClass && vnode.data.staticClass.replace(str, '') || ''} ${str}`.trim();  
}

function wrap(wrapper, fn) {
    return (e) => {
        if(typeof fn === 'function') {
            fn(e);
        }

        if(!e.cancelBubble) {
            wrapper(e);
        }
    };
}

function listener(vnode, key) {
    return vnode.data.on[key] || (
        vnode.componentOptions &&
        vnode.componentOptions.listeners &&
        vnode.componentOptions.listeners[key]
    );
}

function prepare(vnode) {
    vnode.data = Object.assign({staticClass: undefined}, vnode.data);
                
    if(!vnode.data.attrs) {
        vnode.data.attrs = {};
    }
                
    if(!vnode.data.on) {
        vnode.data.on = {};
    }

    return vnode;
}

function is(value) {
    return value === '' || !!value;
}

function disable(vnode) {
    vnode.data.attrs.disabled = undefined;

    Object.assign(vnode.data.attrs, {
        'aria-disabled': true,
        tabindex: -1
    });
        
    appendClass(vnode, 'disabled');

    return vnode;
}

function link(vnode) {
    prepare(vnode);

    appendClass(vnode, 'nav-link');

    if(is(vnode.data.attrs.disabled)) {
        disable(vnode);
    }

    if(is(vnode.data.attrs.active)) {
        appendClass(vnode, 'active');
    }

    return vnode;
}

export default {
    functional: true,

    render(h, context) {
        return context.children
            .filter(vnode => !!vnode.tag)
            .map((vnode, i) => {
                vnode = prepare(vnode);

                vnode.data.on.click = wrap(e => {
                    context.parent.$emit('click-item', e, vnode);
                }, listener(vnode, 'click'));
                
                if(vnode.tag === 'li') {
                    appendClass(vnode, 'nav-item');
                    
                    vnode.children.filter(vnode => !vnode.text).map(child => link(child));

                    return vnode;
                }                

                return h('li', {
                    class: {
                        'nav-item': true,
                    },
                }, [link(vnode)]);
            });
    }

};
</script>
