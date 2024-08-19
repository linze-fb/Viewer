# Viewer Project

## Overview

The Viewer project simulates fetching medical question and answer data along with references, rendering them in an organized and easily navigable manner.

## Installation

To get started with the Viewer Project:

1. Clone the repository:

   ```bash
   git clone https://github.com/linze-fb/Viewer.git
    ```
2. Navigate to the project directory:

   ```bash
   cd Viewer
    ```
3. Install dependencies:

   ```bash
   yarn
    ```
4. Start dev server:

   ```bash
   yarn dev
    ```

## Usage

Once the dev server is running, go to the link provided by the prompt. The app will display questions and their corresponding answers, including citations with references. You can interact with the collapsible sections and citation mark/links. Clicking the "Ask" button next to the placeholding searchbar will simulate loading the next question.

## Notable Components

### App

The entry point of the application. It fetches question and answer data and renders multiple QuestionAndAnswer components with them. A fixed search bar at the top of the page allows users to trigger additional data fetches.

### QuestionAndAnswer

Displays a question with its corresponding answer. The answer section includes collapsible details with references, which are rendered using the References, CitationItem, and CitationMarker components. Clicking on a citation mark will bring the user's attention to the corresponding citation.

### References

The References component lists citations associated with an answer. Each citation is rendered using the CitationItem component, which includes the citation details and a collapsible snippet.