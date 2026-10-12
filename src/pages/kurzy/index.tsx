import Head from "@docusaurus/Head";
import LearningDashboard from "@site/src/components/LearningDashboard";
import LearningShell from "@site/src/components/LearningShell";
import RequireAuth from "@site/src/components/RequireAuth";
import SEOHead from "@site/src/components/SEOHead";
import { useAuth } from "@site/src/hooks/useAuth";
import { useCourseProgress } from "@site/src/hooks/useCourseProgress";
import { useLearningProfile } from "@site/src/hooks/useLearningProfile";
import { useVisibleCourses } from "@site/src/hooks/useVisibleCourses";
import Layout from "@theme/Layout";
import React, { JSX } from "react";

export default function LearningCoursesDashboard(): JSX.Element {
  const title = "Moje kurzy";
  const description = "Výuková platforma Outcybers – dashboard kurzů, kapitoly, materiály a kvízy.";

  const { user } = useAuth();
  const { profile, hasFullAccess, loading: profileLoading, error: profileError } = useLearningProfile();
  const visibleCourses = useVisibleCourses(profile);
  const { getProgress, loading: progressLoading, error: progressError } = useCourseProgress(user);

  const loading = profileLoading || progressLoading;
  const error = profileError ?? progressError;

  return (
    <Layout title={title} description={description} noFooter noEventBar noHeader>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <SEOHead
        title={title}
        description={description}
        url="https://outcybers.net/kurzy/"
        keywords={["výuková platforma", "kurzy", "kybernetická bezpečnost", "outcybers"]}
        noindex
      />
      <RequireAuth redirectTo="/">
        <LearningShell wide noNavbar>
          {error && (
            <div className="alert alert--danger margin-bottom--md" role="alert">
              {error}
            </div>
          )}
          <LearningDashboard
            courses={visibleCourses}
            getProgress={getProgress}
            hasFullAccess={hasFullAccess}
            loading={loading}
          />
        </LearningShell>
      </RequireAuth>
    </Layout>
  );
}
