<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Blog Editor Project - Copilot Instructions

This is a ReactJS + Vite + Tailwind CSS 3.5 project for a Blog Editor application.

## Project Structure

- Rich text editor with card-based content system
- Support for multiple content types: Text, Blockquote, CTA, Big Fact, Blurp, Question, Q&A, Summary, Image, Also Read, Quote, Embed, Table
- Drag and drop functionality for reordering cards and subcards
- Dynamic card creation and deletion system

## Key Technologies

- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS 3.5 for styling
- React Quill for rich text editing
- @dnd-kit for drag and drop functionality
- Lucide React for icons

## Code Style Guidelines

- Use TypeScript for all components
- Follow React functional component patterns with hooks
- Use Tailwind CSS classes for styling
- Implement proper error handling and form validation
- Ensure accessibility compliance
- Use semantic HTML elements

## Component Architecture

- Card containers with rich text editors
- Subcard components for different content types
- Reusable UI components
- Drag and drop context providers
