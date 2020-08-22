<template>
    <div class="Layout">
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav class="Header-navlink">
                <b-nav-item href="#"><h3>Arvan Challenge</h3></b-nav-item>
                <b-nav-item href="#">Welcome Amin</b-nav-item>
            </b-navbar-nav>
            <b-button variant="outline-info" class="ml-auto">Logout</b-button>
        </b-navbar>
        <b-container fluid class="bv-example-row">
            <b-row>
                <b-col cols="2" class="sidebar">
                    <aside>
                        <h4>Posts</h4>

                        <router-link to="/admin" exact="true">All Articles</router-link>
                        <router-link to="/admin/create">Add Articles</router-link>
                    </aside>
                </b-col>
                <b-col>
                    <main class="LayoutDefault__main">
                        <slot/>
                    </main>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<style scoped lang="scss">
    .Header-navlink {
        display: flex;
        align-items: center;
    }
    .sidebar {
        height: calc(100vh - 48px);
        background: #1C7CD5;
        padding: 0;

        & aside {
            width: 100%;
            display: flex;
            flex-flow: column;
            align-items: flex-start;

            & h4 {
                padding: 10px 20px;
                color: white;
            }
            
            & a {
                text-decoration: none;
                color: white;
                width: 100%;
                padding: 10px 20px;
                text-align: left;

                &.router-link-active {
                    background: rgba(86,192,224, 0.14);
                }
            }
        }
    }
</style>