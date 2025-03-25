# Curriculum Content Integration Guide

This guide explains how to integrate curriculum content from the n8n workflow with the GitHub Pages site.

## Content Flow

1. **Content Generation**: Content is generated through the n8n workflow
2. **Content Repository**: Generated content is pushed to the [PFL Academy Content Repository](https://github.com/jghiglia2380/pfl-academy-content)
3. **GitHub Pages**: Content is integrated into the GitHub Pages site repository

## Integration Steps

### 1. Update n8n Workflow

Update the n8n workflow to push content to both repositories:

```javascript
// In the GitHub integration node:
const pushToContentRepo = async (content, standard, chapter) => {
  // Current implementation - push to content repository
};

const pushToSiteRepo = async (content, standard, chapter) => {
  // New implementation - push formatted content to site repository
  
  // Format student content for GitHub Pages
  const day1Html = formatForGitHubPages(content.student_day1);
  const day2Html = formatForGitHubPages(content.student_day2);
  
  // Format teacher content for GitHub Pages
  const teacherGuide = formatTeacherGuideForGitHubPages(content.teacher_day1, content.teacher_day2);
  
  // Push to GitHub Pages repository structure
  await pushFile(`standards/Standard-${standard}/Chapter-${chapter}/student/day1.html`, day1Html);
  await pushFile(`standards/Standard-${standard}/Chapter-${chapter}/student/day2.html`, day2Html);
  await pushFile(`standards/Standard-${standard}/Chapter-${chapter}/teacher/guide.html`, teacherGuide);
};

// Execute both pushes
await pushToContentRepo(content, standard, chapter);
await pushToSiteRepo(content, standard, chapter);
```

### 2. Manual Content Transfer

If you prefer to manually transfer content:

1. Clone both repositories:
```bash
git clone https://github.com/jghiglia2380/pfl-academy-content.git
git clone https://github.com/jghiglia2380/pfl-academy-site.git
```

2. Copy and format content:
```bash
# For each chapter:
cp -r pfl-academy-content/Standard-X/X.Y/* pfl-academy-site/standards/Standard-X/Chapter-X-Y/
# Then manually adjust formatting to match site templates
```

3. Push changes to site repository:
```bash
cd pfl-academy-site
git add .
git commit -m "Add content for Standard X Chapter Y"
git push origin main
```

### 3. Automated Content Transfer Script

You can create a script to automate the transfer:

```bash
#\!/bin/bash
# content-transfer.sh

# Clone or pull latest from both repositories
git -C pfl-academy-content pull || git clone https://github.com/jghiglia2380/pfl-academy-content.git
git -C pfl-academy-site pull || git clone https://github.com/jghiglia2380/pfl-academy-site.git

# For each standard and chapter, transfer and format content
# This is a simplified example - actual implementation would need to handle formatting
for standard_dir in pfl-academy-content/Standard-*/; do
  standard=$(basename "$standard_dir" | sed 's/Standard-//')
  for chapter_dir in "$standard_dir"*/; do
    chapter=$(basename "$chapter_dir")
    
    # Create directory structure in site repo
    mkdir -p "pfl-academy-site/standards/Standard-$standard/Chapter-$standard-$chapter/student"
    mkdir -p "pfl-academy-site/standards/Standard-$standard/Chapter-$standard-$chapter/teacher"
    
    # Copy and format student content
    cp "$chapter_dir/student/day1.md" "pfl-academy-site/standards/Standard-$standard/Chapter-$standard-$chapter/student/day1.html"
    cp "$chapter_dir/student/day2.md" "pfl-academy-site/standards/Standard-$standard/Chapter-$standard-$chapter/student/day2.html"
    
    # Copy and format teacher content
    cp "$chapter_dir/teacher/guide.md" "pfl-academy-site/standards/Standard-$standard/Chapter-$standard-$chapter/teacher/guide.html"
    
    # Format files (this would be a custom script to convert markdown to HTML with site styling)
    ./format-content.js "pfl-academy-site/standards/Standard-$standard/Chapter-$standard-$chapter/student/day1.html"
    ./format-content.js "pfl-academy-site/standards/Standard-$standard/Chapter-$standard-$chapter/student/day2.html"
    ./format-content.js "pfl-academy-site/standards/Standard-$standard/Chapter-$standard-$chapter/teacher/guide.html"
  done
done

# Commit and push changes to site repository
cd pfl-academy-site
git add .
git commit -m "Update content from content repository"
git push origin main
```

## Content Formatting

The GitHub Pages site uses specific HTML templates. When transferring content, ensure it's formatted correctly:

1. Student content should use the templates in `standards/Standard-1/Chapter-1-1/student/` as a guide
2. Teacher content should use the template in `standards/Standard-1/Chapter-1-1/teacher/guide.html`
3. All content should include proper navigation, styling, and interactive elements

## GitHub Pages Settings

After pushing content to the site repository:

1. Go to the repository settings on GitHub
2. Navigate to Pages settings
3. Ensure the source branch is set to `main`
4. The site will be available at `https://jghiglia2380.github.io/pfl-academy-site/`

## Testing Integration

1. Generate content for a single chapter through the n8n workflow
2. Ensure it's properly pushed to both repositories
3. Visit the GitHub Pages site to verify the content appears correctly
4. Test all interactive elements and navigation

## Support

For questions or issues with content integration, contact the development team or create an issue in the repository.
