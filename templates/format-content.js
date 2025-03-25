/**
 * Content Formatter for PFL Academy
 * 
 * This script converts markdown content from the content repository
 * into HTML formatted for the GitHub Pages site.
 */

const fs = require('fs');
const path = require('path');

// Command line arguments
const inputFile = process.argv[2];
const outputFile = process.argv[3] || inputFile;

// Templates
const TEMPLATES_DIR = path.join(__dirname, '../templates');
const STUDENT_DAY1_TEMPLATE = path.join(TEMPLATES_DIR, 'student-day1-template.html');
const STUDENT_DAY2_TEMPLATE = path.join(TEMPLATES_DIR, 'student-day2-template.html');
const TEACHER_GUIDE_TEMPLATE = path.join(TEMPLATES_DIR, 'teacher-guide-template.html');

// Helper function to determine template based on file path
function getTemplateForFile(filePath) {
  if (filePath.includes('/student/day1')) {
    return STUDENT_DAY1_TEMPLATE;
  } else if (filePath.includes('/student/day2')) {
    return STUDENT_DAY2_TEMPLATE;
  } else if (filePath.includes('/teacher/guide')) {
    return TEACHER_GUIDE_TEMPLATE;
  } else {
    throw new Error(`Cannot determine template for ${filePath}`);
  }
}

// Helper function to extract chapter info from file path
function getChapterInfo(filePath) {
  const match = filePath.match(/Standard-(\d+)\/Chapter-\d+-(\d+)/);
  if (match) {
    return {
      standard: match[1],
      chapter: match[2]
    };
  }
  return { standard: '?', chapter: '?' };
}

// Main function to format content
function formatContent(inputPath, outputPath, templatePath) {
  // Read input content
  const content = fs.readFileSync(inputPath, 'utf8');
  
  // Read template
  const template = fs.readFileSync(templatePath, 'utf8');
  
  // Get chapter info
  const chapterInfo = getChapterInfo(inputPath);
  
  // Replace placeholders in template
  let formattedContent = template
    .replace(/{{STANDARD}}/g, chapterInfo.standard)
    .replace(/{{CHAPTER}}/g, chapterInfo.chapter)
    .replace(/{{CONTENT}}/g, processMarkdownToHtml(content));
  
  // Write output
  fs.writeFileSync(outputPath, formattedContent);
  console.log(`Formatted ${inputPath} -> ${outputPath}`);
}

// Convert markdown to HTML (simplified example)
function processMarkdownToHtml(markdown) {
  // This is a very simplified example
  // In a real implementation, use a proper markdown parser
  
  let html = markdown;
  
  // Headers
  html = html.replace(/^# (.*)/gm, '<h1 class="text-3xl font-bold text-gray-800 mb-4">$1</h1>');
  html = html.replace(/^## (.*)/gm, '<h2 class="text-2xl font-bold text-gray-800 mb-4">$1</h2>');
  html = html.replace(/^### (.*)/gm, '<h3 class="text-xl font-semibold text-gray-800 mb-3">$1</h3>');
  
  // Paragraphs
  html = html.replace(/^(?\!<h|<ul|<ol|<li|<div|<table)(.*)/gm, '<p class="text-gray-700 mb-4">$1</p>');
  
  // Lists
  html = html.replace(/^\* (.*)/gm, '<li>$1</li>');
  html = html.replace(/^(\d+)\. (.*)/gm, '<li>$2</li>');
  
  // Wrap lists
  html = html.replace(/((<li>.*<\/li>\n)+)/g, '<ul class="list-disc ml-6 space-y-2 text-gray-700 mb-4">$1</ul>');
  
  // Bold and Italic
  html = html.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*)\*/g, '<em>$1</em>');
  
  return html;
}

// Main execution
try {
  // Determine appropriate template
  const templatePath = getTemplateForFile(inputFile);
  
  // Format the content
  formatContent(inputFile, outputFile, templatePath);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
