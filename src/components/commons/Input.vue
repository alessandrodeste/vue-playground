<template>
    <fieldset class="form-group">
        
        <label>{{ title }}{{ required ? '*' : '' }}</label>
        <div>
            <input class="form-control" 
                :placeholder="placeholder" 
                :type="type" 
                :name="name" 
                :disabled="disabled === true ? true : false"
                :value="value"
                @input="updateValue($event.target.value)"
                />

           <div class="error" v-if="error">{{ error }}</div>
        </div>
        
    </fieldset>
</template>

<script>
    export default {
        props: {
            title: { type: String, required: true },
            name: { type: String },
            type: { type: String, default: 'text' },
            disabled: { type: Boolean, default: false },
            value: [String, Boolean, Number],
            placeholder: String,
            error: String,
            required: { type: Boolean, default: false }
            
        },
        methods: {
            updateValue(val) {
                this.$emit('input', val);
            }
        }
    }
</script>