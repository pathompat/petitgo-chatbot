
# Petitgo Chatbot 🤖

Welcome to the **Petitgo Chatbot** repository! This chatbot is designed to assist in automating conversations and customer support interactions for **Petitgo Shop**. The chatbot is integrated with the LINE Messaging API and can handle customer queries, display product availability, and facilitate order inquiries.

## Features ✨

- **Interactive Chat**: Responds to customer inquiries using predefined responses and logic.
- **Product Availability**: Provides real-time information about product availability.
- **Order Support**: Helps customers with order inquiries and details.
- **LINE Messaging API Integration**: Seamlessly works with LINE's messaging platform for customer interaction.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)

---

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have Node.js installed (v18 or later).
- You have a LINE Developers account with access to the LINE Messaging API.
- You have a Firebase account (if you're using Firebase for functions or hosting).
- You have the **Firebase CLI** installed if deploying to Firebase.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/pathompat/petitgo-chatbot.git
   cd petitgo-chatbot/functions
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:  
   You’ll need to set up your `.env` file to include the necessary keys and IDs for the LINE Messaging API and Firebase (if used).

### Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```plaintext
LINE_CHANNEL_SECRET=your_line_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_line_access_token
FB_API_KEY=your_firebase_api_key
FB_AUTH_DOMAIN=your_project_id.firebaseapp.com
FB_PROJECT_ID=your_project_id
FB_STORAGE_BUCKET=your_project_id.appspot.com
FB_MESSAGING_SENDER_ID=your_sender_id
FB_APP_ID=your_app_id
```

Make sure to replace these values with your actual project credentials.

### Firebase Setup (Optional)

If you're using Firebase for functions or hosting, ensure you have the Firebase CLI set up and configured:

```bash
firebase login
firebase init
```

---

## Usage

Once you’ve set up the environment and installed dependencies, you can start the chatbot server locally:

```bash
npm run serve
```

---

## Deployment

To deploy the chatbot to a live environment, such as Firebase Functions, follow these steps:

1. **Deploy to Firebase**:
   
   If you're using Firebase, deploy the chatbot using:

   ```bash
   npm run reploy
   ```

2. **Update LINE Webhook**:

   After deployment, update your webhook URL in the **LINE Developer Console** with your Firebase Function URL or any other hosting platform.

---

