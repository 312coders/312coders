import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import Community from "./components/Community";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProtectedRoute from './components/ProtectedRoute';
import AdminPostsPage from './pages/AdminPostsPage';
import EditPage from './pages/EditPage';
import { api } from "./api";
import { AlertContextProvider } from "./hooks/useAlert";
import Alert from "./components/Alert";

const Layout = () => {
  return (
    <AlertContextProvider>
      <Navbar />
      <main>
        <Outlet />
        <Alert />
      </main>
      <Footer />
    </AlertContextProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/community",
        element: <Community />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/blog",
        children: [
          {
            path: "admin-posts",
            element:
              <ProtectedRoute>
                <AdminPostsPage />
              </ProtectedRoute>,
            loader: async () => {
              return await api.blog.getPosts();
            },
            action: async ({ request, params }) => {
              console.log(request)
              if (request.method === 'DELETE') {
                const formData = await request.formData();
                await api.blog.deletePost(formData.get('id')?.toString() ?? '');
                return null;
              }
              return null;
            },
          },
          {
            path: "edit/:id",
            element:
              <ProtectedRoute>
                <EditPage />
              </ProtectedRoute>,
            loader: async ({ params }) => {
              if (params.id) {
                return await api.blog.getPost(params.id ?? '');
              } else {
                return null;
              }
            },
          }
        ]
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
