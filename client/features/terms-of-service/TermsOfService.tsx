import React from 'react';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { Box, Typography, List, ListItem, Link } from '@mui/material';
import styles from '@styles/TermsOfService.module.css';

const TermsOfService = () => {
  useDocumentTitle('Terms of Service');
  const lastUpdatedDate = 'September 25, 2024';
  const contactEmail = 'info@linkta.io';

  return (
    <Box className={styles['terms-box-container']}>
      <Typography
        variant='h3'
        className={styles.title}
      >
        Terms of Service
      </Typography>
      <Typography
        variant='h6'
        className={styles['updated-date']}
      >
        Updated: {lastUpdatedDate}
      </Typography>
      <List>
        <ListItem className={styles['list-item']}>
          <Typography variant='body1'>
            <strong>1. Acceptance of Terms:</strong> By accessing or using
            Linkta (&quot;the App&quot;), you agree to comply with and be bound
            by these Terms of Service (&quot;Terms&quot;). If you do not agree,
            do not use the App.
          </Typography>
        </ListItem>
        <ListItem className={styles['list-item']}>
          <Typography variant='body1'>
            <strong>2. Use of the Application:</strong> You agree to use the App
            only for lawful purposes and in compliance with these Terms. You are
            responsible for ensuring your use of the App complies with
            applicable laws and regulations.
          </Typography>
        </ListItem>
        <ListItem className={styles['list-item']}>
          <Typography variant='body1'>
            <strong>3. Use of Gemini API:</strong> Our app utilizes the Gemini
            API to provide certain services. By using the app, you acknowledge
            and agree to the processing of data through the Gemini API. You must
            comply with Gemini&apos;s own terms and policies when using their
            services through our app.
          </Typography>
        </ListItem>
        <ListItem className={styles['list-item']}>
          <Typography variant='body1'>
            <strong>4. Intellectual Property:</strong> All content, trademarks,
            and materials within the App are owned by Linkta or our licensors.
            You are granted a limited license to use the App&apos;s features for
            personal, non-commercial purposes.
          </Typography>
        </ListItem>
        <ListItem className={styles['list-item']}>
          <Typography variant='body1'>
            <strong>5. User Content:</strong> You retain ownership of any
            content you submit through the App. However, by submitting content,
            you grant us a non-exclusive, worldwide, royalty-free license to
            use, display, and distribute your content within the App.
          </Typography>
        </ListItem>
        <ListItem className={styles['list-item']}>
          <Typography variant='body1'>
            <strong>6. Limitation of Liability:</strong> To the fullest extent
            permitted by law, Linkta is not liable for any damages arising from
            your use of the App, including but not limited to direct, indirect,
            incidental, or consequential damages.
          </Typography>
        </ListItem>
        <ListItem className={styles['list-item']}>
          <Typography variant='body1'>
            <strong>7. Modifications to the Terms:</strong> We may update these
            Terms at any time. Continued use of the App after any changes
            constitutes your acceptance of the revised Terms.
          </Typography>
        </ListItem>
        <ListItem className={styles['list-item']}>
          <Typography variant='body1'>
            <strong>8. Termination:</strong> We reserve the right to suspend or
            terminate your access to the App at our sole discretion, without
            notice, for conduct that violates these Terms or is otherwise
            harmful to the App.
          </Typography>
        </ListItem>
        <ListItem className={styles['list-item']}>
          <Typography variant='body1'>
            <strong>9. Contact Us:</strong> For any questions regarding these
            Terms, please contact us at{' '}
            <Link
              href={`mailto:${contactEmail}`}
              className={styles['email-link']}
            >
              {contactEmail}
            </Link>
            .
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default TermsOfService;
