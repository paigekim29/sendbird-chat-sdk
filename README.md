# Sendbird Chat Application

This is a web application built with Next.js, Tailwind CSS, and TypeScript, integrating Sendbird's chat SDK to provide
chat functionality.

## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [UI Design](#ui-design)
- [Wireframe](#wireframe)
- [License](#license)

## Getting Started

Follow these instructions to set up and run the application on your local machine.

### Prerequisites

Ensure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/en/download/) (v20.11.0 LTS recommended)
- Sendbird API Token (Sign up and obtain one from [Sendbird Dashboard](https://dashboard.sendbird.com/auth/signin))

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies:**

   ```bash
   yarn install
   ```
3. **Set environment variables:**

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   NEXT_PUBLIC_SENDBIRD_APP_ID=<your-sendbird-app-id>
   ```
   Replace `<your-sendbird-app-id>` with your Sendbird App ID obtained from the Sendbird Dashboard.
4. **Run the application:**

   ```bash
   yarn dev
   ```
5. **Open the application:**

   Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Features

- User Authentication: Users can log in using their Sendbird API Token.
- Channel Management: Users can view a list of channels and create new channels.
- Message Interaction: Users can view messages within a channel and send new messages.

## UI Design

- Ant Design (antd): Incorporated for its comprehensive set of UI components, facilitating the creation of a consistent
  and user-friendly interface.
- Responsive Design: Ensured compatibility across various devices and screen sizes, enhancing accessibility and
  usability for all users.
- Clean and Intuitive Layout: Designed with a focus on simplicity and clarity, enabling users to navigate channels and
  interact with messages effortlessly.

## Wireframe

- [Figma Wireframe](https://www.figma.com/file/6hmzKmRtSLGrsp6wN2y5MT/sendbird-chat-sdk?type=design&node-id=0-1&mode=design&t=qROEtSMZVxnLiRUf-0)

## License

- This project is licensed under the [MIT License](https://github.com/paigekim29/sendbird-chat-sdk/blob/main/LICENSE).