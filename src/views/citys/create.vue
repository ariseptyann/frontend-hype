<script setup>
    //import ref
    import { ref, onMounted } from "vue";

    //import router
    import { useRouter } from 'vue-router';

    //import api
    import api from "../../api";

    //init router
    const router = useRouter();

    //define state
    const provinces = ref([]);
    const province = ref("");
    const name = ref("");
    const errors = ref([]);

    //onMounted
    onMounted( async () => {

        //fetch get provinces
        await api.get(`/provinces`)
        .then(response => {
            //set response data to state
            provinces.value = response.data
        });
    })

    //method "storeCity"
    const storeCity = async () => {
        const data = {
            "name": name.value,
            "province": province.value
        }
        //store data with API
        await api.post('/citys/send', data)
        .then(() => {
            //redirect
            router.push({ path: "/citys" });
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
                        <form @submit.prevent="storeCity()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Province</label>
                                <select class="form-control" v-model="province">
                                    <option v-for="(province, index) in provinces" :value="province.id" :key="index">
                                        {{ province.name }}
                                    </option>
                                </select>
                                <div v-if="errors.message" class="alert alert-danger mt-2">
                                    <span>{{ errors.message }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">City Name</label>
                                <input type="text" class="form-control" v-model="name" placeholder="City name">
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