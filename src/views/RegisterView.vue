<template>
  <section class="auth-page">
    <div class="auth-card">
      <h1>注册校园轻集市账号</h1>
      <p class="desc">创建账号后，可以发布信息、收藏内容并进入个人中心。</p>

      <form class="auth-form" @submit.prevent="handleRegister">
        <FormField label="账号" required :error="errors.username">
          <input v-model.trim="form.username" type="text" placeholder="请输入账号" />
        </FormField>

        <FormField label="密码" required :error="errors.password">
          <input v-model.trim="form.password" type="password" placeholder="请输入密码" />
        </FormField>

        <FormField label="昵称" required :error="errors.name">
          <input v-model.trim="form.name" type="text" placeholder="请输入昵称" />
        </FormField>

        <FormField label="年级" required :error="errors.grade">
          <input v-model.trim="form.grade" type="text" placeholder="例如：2023级" />
        </FormField>

        <button class="primary" type="submit" :disabled="submitting">
          {{ submitting ? '注册中...' : '注册' }}
        </button>
      </form>

      <p class="switch">
        已有账号？
        <RouterLink to="/login">去登录</RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import FormField from '../components/FormField.vue'
import { createUser, getUsers } from '../api/user'

const router = useRouter()
const submitting = ref(false)

const form = reactive({
  username: '',
  password: '',
  name: '',
  grade: '',
})

const errors = reactive<Record<string, string>>({})

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
}

function validateForm() {
  clearErrors()

  if (!form.username) {
    errors.username = '请输入账号'
  }

  if (!form.password) {
    errors.password = '请输入密码'
  } else if (form.password.length < 6) {
    errors.password = '密码长度不能少于 6 位'
  }

  if (!form.name) {
    errors.name = '请输入昵称'
  }

  if (!form.grade) {
    errors.grade = '请输入年级'
  }

  return Object.values(errors).every((message) => !message)
}

async function handleRegister() {
  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    const res = await getUsers()
    const exists = res.data.some((user) => user.username === form.username)

    if (exists) {
      errors.username = '账号已存在'
      return
    }

    await createUser({
      username: form.username,
      password: form.password,
      name: form.name,
      college: '未设置',
      grade: form.grade,
      avatar: '',
      bio: '这个同学还没有填写个人简介。',
    })

    window.alert('注册成功，请登录')
    router.push('/login')
  } catch (error) {
    console.error(error)
    window.alert('注册失败，请检查 Mock 服务是否正常运行')
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
