<script setup>
    //import ref
    import { ref } from "vue";

    //import router
    import { useRouter } from 'vue-router';

    //import api
    import api from "../../api";

    //init router
    const router = useRouter();

    //define state
    const name = ref("");
    const errors = ref([]);

    //method "storeProvince"
    const storeProvince = async () => {
        const data = {
            "name": name.value
        }
        //store data with API
        await api.post('/provinces/send', data)
        .then(() => {
            //redirect
            router.push({ path: "/provinces" });
        })
        .catch((error) => {
            //assign response error data to state "errors"
            errors = error;
        });
    };
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="storeProvince()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Name</label>
                                <input type="text" class="form-control" v-model="name" placeholder="Province name">
                                <div v-if="errors.message" class="alert alert-danger mt-2">
                                    <span>{{ errors.message }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>