import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export { NavLink };

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

interface INavLink {
  href: string;
  exact?: string;
  children?: any;
  style?: Object;
  className?: string;
  sx: any;
}

function NavLink({ href, exact, children, className, sx }: INavLink) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Box
      sx={{
        padding: '4px',
        backgroundColor: isActive ? 'rgb(237, 231, 246)' : '#fff',
        borderRadius: '4px',
        transition: 'background-color ease-in-out 200ms',
        ':hover': {
          backgroundColor: 'rgb(237, 231, 246)',
        },
        ...sx,
      }}
    >
      <Link href={href} style={{ width: '100%' }}>
        <Box
          className={className}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {children}
        </Box>
      </Link>
    </Box>
  );
}
