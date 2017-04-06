<template>
    <fieldset class="form-group">
        
        <div>
            <input name="{{ name }}" 
                :value="model"
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
            model: String,
            placeholder: String,
            error: String,
            required: { type: Boolean, default: false }
            
        }
    }
</script>