<script setup>
    //import ref
    import { ref, onMounted } from "vue";

    //import router
    import { useRouter, useRoute } from 'vue-router';

    //import api
    import api from "../../api";

    //init router
    const router = useRouter();

    //init route
    const route = useRoute();
    
    //define state
    const name = ref("");
    const errors = ref([]);

    //onMounted
    onMounted( async () => {

        //fetch detail data province by ID
        await api.get(`/provinces/single/${route.params.id}`)
        .then(response => {
            
            //set response data to state
            name.value = response.data.name
        });
    })

    //method "updateProvince"
    const updateProvince = async () => {
        const data = {
            "name": name.value
        }

        //store data with API
        await api.put(`/provinces/update/${route.params.id}`, data)
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
                        <form @submit.prevent="updateProvince()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Name</label>
                                <input type="text" class="form-control" v-model="name" placeholder="Province name">
                                <div v-if="errors.message" class="alert alert-danger mt-2">
                                    <span>{{ errors.message }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>