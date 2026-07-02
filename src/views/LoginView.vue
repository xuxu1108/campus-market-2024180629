<template>
  <section class="auth-page">
    <div class="auth-card">
      <h1>登录校园轻集市</h1>
      <p class="desc">登录后可以发布信息、收藏内容并进入个人中心。</p>

      <form class="auth-form" @submit.prevent="handleLogin">
        <FormField label="账号" required :error="errors.username">
          <input v-model.trim="form.username" type="text" placeholder="请输入账号" />
        </FormField>

        <FormField label="密码" required :error="errors.password">
          <input v-model.trim="form.password" type="password" placeholder="请输入密码" />
        </FormField>

        <p v-if="loginError" class="login-error">{{ loginError }}</p>

        <button class="primary" type="submit" :disabled="submitting">
          {{ submitting ? '登录中...' : '登录' }}
        </button>
      </form>

      <p class="switch">
        还没有账号？
        <RouterLink to="/register">去注册</RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import FormField from '../components/FormField.vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const submitting = ref(false)
const loginError = ref('')

const form = reactive({
  username: '',
  password: '',
})

const errors = reactive<Record<string, string>>({})

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
  loginError.value = ''
}

function validateForm() {
  clearErrors()

  if (!form.username) {
    errors.username = '请输入账号'
  }

  if (!form.password) {
    errors.password = '请输入密码'
  }

  return Object.values(errors).every((message) => !message)
}

async function handleLogin() {
  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    await userStore.login(form.username, form.password)
    window.alert('登录成功')
    router.push('/user')
  } catch (error) {
    console.error(error)
    loginError.value = '账号或密码错误'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 120px);
  display: grid;
  place-items: center;
}

.auth-card {
  width: 420px;
  padding: 32px;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  border-top: 4px solid var(--color-primary);
}

.auth-card h1 {
  margin: 0 0 8px;
  font-size: var(--text-2xl);
  font-weight: 700;
}

.desc {
  margin: 0 0 24px;
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: var(--text-sm);
}

.auth-form {
  display: grid;
  gap: var(--space-lg);
}

input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 11px 16px;
  font-size: var(--text-sm);
  font-family: var(--font-sans);
  color: var(--text-primary);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-bg);
}

input::placeholder {
  color: var(--text-muted);
}

.login-error {
  margin: 0;
  color: var(--color-danger);
  font-size: var(--text-sm);
  font-weight: 500;
}

.primary {
  border: none;
  border-radius: var(--radius-full);
  padding: 12px 16px;
  cursor: pointer;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #fff;
  font-size: var(--text-base);
  font-weight: 600;
  transition: all var(--transition-fast);
}

.primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.primary:active:not(:disabled) {
  transform: translateY(0);
}

.primary:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.switch {
  margin: 20px 0 0;
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.switch a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
}

.switch a:hover {
  text-decoration: underline;
}
</style>
