<template>
    <nav aria-label="nav" class="nav" :class="classes">
        <navigation-items>
            <slot />
        </navigation-items>
    </nav>
</template>

<script>
import NavigationItems from './NavigationItems';

export default {

    name: 'Navigation',

    components: {
        NavigationItems
    },

    props: {
        fill: Boolean,
        justified: Boolean,
        pills: Boolean,
        tabs: Boolean
    },

    computed: {
        classes() {
            return {
                'nav-fill': this.fill,
                'nav-justified': this.justified,
                'nav-pills': this.pills,
                'nav-tabs': this.tabs && !this.pills,
            };
        }
    }

};
</script>
