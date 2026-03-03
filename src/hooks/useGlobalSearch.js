import { useState, useEffect } from 'react';
import { getPosts } from '../utils/markdownLoader';
import { getAllProjects } from '../utils/projectLoader';

export function useGlobalSearch() {
  const [allPosts, setAllPosts] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsData, projectsData] = await Promise.all([
          getPosts(),
          getAllProjects()
        ]);
        setAllPosts(postsData);
        setAllProjects(projectsData);
      } catch (error) {
        console.error('Failed to load data for search:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const search = (query) => {
    if (!query || query.trim() === '') {
      return { posts: [], projects: [] };
    }

    const lowerQuery = query.toLowerCase().trim();

    // Helper function to check if an item matches the query
    const isMatch = (item) => {
      // Check title
      if (item.title && item.title.toLowerCase().includes(lowerQuery)) return true;
      
      // Check excerpt/description
      if (item.excerpt && item.excerpt.toLowerCase().includes(lowerQuery)) return true;
      
      // Check tags (posts)
      if (item.tags && Array.isArray(item.tags)) {
        if (item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;
      }
      
      // Check skills (projects)
      if (item.skills) {
        const skillsArray = typeof item.skills === 'string' ? item.skills.split(',') : item.skills;
        if (skillsArray.some(skill => skill.trim().toLowerCase().includes(lowerQuery))) return true;
      }

      // Check language (projects)
      if (item.language && item.language.toLowerCase().includes(lowerQuery)) return true;

      return false;
    };

    const matchedPosts = allPosts.filter(isMatch);
    const matchedProjects = allProjects.filter(isMatch);

    return {
      posts: matchedPosts,
      projects: matchedProjects
    };
  };

  return { search, isLoading, allPosts, allProjects };
}
