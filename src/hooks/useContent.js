import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

// Упрощенные хуки для новой структуры

export function useHomePageContent() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/content/home/`);
        if (!res.ok) throw new Error('Failed to fetch home content');
        const data = await res.json();
        setContent(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching home content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return { content, loading, error };
}

export function useAboutPageContent() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/content/about/`);
        if (!res.ok) throw new Error('Failed to fetch about content');
        const data = await res.json();
        setContent(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching about content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return { content, loading, error };
}

export function useContactPageContent() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/content/contact/`);
        if (!res.ok) throw new Error('Failed to fetch contact content');
        const data = await res.json();
        setContent(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching contact content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return { content, loading, error };
}

export function useInstagramPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/content/instagram/`);
        if (!res.ok) throw new Error('Failed to fetch Instagram posts');
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching Instagram posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return { posts, loading, error };
}
