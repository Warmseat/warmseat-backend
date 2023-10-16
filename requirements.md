# Software Requirements

## Vision

This software project aims to create a platform known as "Warmseat," a conversation chat agent. The vision of this product is to provide users with the ability to save YouTube video URLs and query video transcripts. The project addresses the pain point of efficiently accessing information within video content. Users should care about this product because it offers a solution to the common challenge of navigating and extracting valuable insights from video content.

## Scope (In/Out)

### IN - What will your product do

- Query Video Transcripts:
    Users can input a YouTube URL to retrieve and query the video transcript.
- Save Video(Stretch Goal):
    Users can input a YouTube URL to save for later.
- Query Video(s)(Stretch Goal):
    Users can search within the saved video transcripts using specific keywords or phrases.
- Notifications:
    Users receive notifications when new transcripts are added.

### OUT - What will your product not do

- Mobile Apps:
    The project will not develop iOS or Android mobile applications.

## Minimum Viable Product vs Stretch

### Minimum Viable Product (MVP) Functionality

- Users can input a YouTube URL to retrieve the video transcript.
- Users can search for specific keywords or phrases within video transcripts.
- Implementing vectorization of data for enhanced search capabilities.
- Basic user authentication to access saved URLs and transcripts.

### Stretch Goals

- Support for multiple saved video URLs.
- Users can save YouTube video URLs.
- Database storage for saving URLs and transcripts for later retrieval and re-querying.

## Functional Requirements

- User Authentication:
    Users can log in to be authorized to run queries on saved videos.
- Save Video URLs:
    Users can enter YouTube video URLs to save for later.
- Search Transcripts:
    Users can query video transcripts using specific keywords or phrases.
- Notification System:
    Users receive notifications when new transcripts are added.

## Data Flow

**The data flow in the application involves the following steps:**

- User logs in or signs up to access the system.
- Users can save YouTube video URLs, which are stored in the application's database.
- Users can search for specific keywords within the saved video transcripts.
- If new transcripts are added, users receive notifications.

## Non-Functional Requirements

- Security:
    The application will implement robust security measures to protect user data and ensure secure access.

- Usability:
    The user interface will be intuitive and user-friendly to ensure ease of use.
