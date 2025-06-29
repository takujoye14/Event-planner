<template>
  <div class="contact-page">
    <h1 class="page-title">Contact Us</h1>
    <p class="contact-description">
      We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.
    </p>
    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" id="subject" v-model="form.subject" required />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" rows="5" v-model="form.message" required></textarea>
      </div>
      <div class="button-wrapper">
        <button type="submit" class="submit-button">Send Message</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log("Form submitted:", this.form);
      alert("Thank you for reaching out! We will get back to you soon.");
      this.form.name = '';
      this.form.email = '';
      this.form.subject = '';
      this.form.message = '';
    }
  }
};
</script>

<style scoped>
.contact-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  color: #f0f0f0;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ffcc00;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.contact-description {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #cccccc;
}

.contact-form {
  background: #1e1e2f;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #ffffff;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #2b2b3e;
  border: 1px solid #444;
  border-radius: 10px;
  color: #f0f0f0;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #ffcc00;
  outline: none;
}

.button-wrapper {
  text-align: center;
  margin-top: 1rem;
}

.submit-button {
  background-color: #ffcc00;
  color: #1e1e2f;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #e1b40d;
}
</style>