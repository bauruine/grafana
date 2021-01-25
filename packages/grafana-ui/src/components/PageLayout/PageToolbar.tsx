import React, { FC, ReactNode } from 'react';
import { css, cx } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { useStyles } from '../../themes/ThemeContext';
import { IconName } from '../../types';
import { Icon } from '../Icon/Icon';
import { styleMixins } from '../../themes';
import { IconButton } from '../IconButton/IconButton';
import { selectors } from '@grafana/e2e-selectors';

export interface Props {
  pageIcon?: IconName;
  title: string;
  parent?: string;
  onGoBack?: () => void;
  onClickTitle?: () => void;
  onClickParent?: () => void;
  leftItems?: ReactNode[];
  children?: ReactNode;
  className?: string;
}

/** @alpha */
export const PageToolbar: FC<Props> = React.memo(
  ({ title, parent, pageIcon, onGoBack, children, onClickTitle, onClickParent, leftItems, className }) => {
    const styles = useStyles(getStyles);

    return (
      <div className={cx(styles.toolbar, className)}>
        <div className={styles.toolbarLeft}>
          {pageIcon && !onGoBack && (
            <div className={styles.pageIcon}>
              <Icon name={pageIcon} size="lg" />
            </div>
          )}
          {onGoBack && (
            <div className={styles.goBackButton}>
              <IconButton
                name="arrow-left"
                tooltip="Go back (Esc)"
                tooltipPlacement="bottom"
                size="xxl"
                surface="dashboard"
                aria-label={selectors.components.BackButton.backArrow}
                onClick={onGoBack}
              />
            </div>
          )}
          <div className={styles.titleWrapper}>
            {parent && onClickParent && (
              <a onClick={onClickParent} className={cx(styles.titleLink, styles.parentLink)}>
                {parent} <span className={styles.parentIcon}>/</span>
              </a>
            )}
            {onClickTitle && (
              <a onClick={onClickTitle} className={styles.titleLink}>
                {title}
              </a>
            )}
            {!onClickTitle && <div className={styles.titleText}>{title}</div>}
          </div>
          {leftItems &&
            leftItems.map((child, index) => (
              <div className={styles.leftActionItem} key={index}>
                {child}
              </div>
            ))}
        </div>
        <div className={styles.spacer}></div>
        {React.Children.toArray(children)
          .filter(Boolean)
          .map((child, index) => {
            return (
              <div className={styles.actionWrapper} key={index}>
                {child}
              </div>
            );
          })}
      </div>
    );
  }
);

PageToolbar.displayName = 'PageToolbar';

const getStyles = (theme: GrafanaTheme) => {
  const { spacing, typography } = theme;

  const titleStyles = `
      font-size: ${typography.size.lg};
      padding-left: ${spacing.sm};
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;      
  `;

  return {
    toolbar: css`
      display: flex;
      background: ${theme.colors.dashboardBg};
      justify-content: flex-end;
      flex-wrap: wrap;
      padding: 0 ${spacing.md} ${spacing.sm} ${spacing.md};
    `,
    toolbarLeft: css`
      display: flex;
      flex-grow: 1;
      min-width: 0;
    `,
    spacer: css`
      flex-grow: 1;
    `,
    pageIcon: css`
      padding-top: ${spacing.sm};
      align-items: center;
      display: none;

      @media ${styleMixins.mediaUp(theme.breakpoints.md)} {
        display: flex;
      }
    `,
    titleWrapper: css`
      display: flex;
      align-items: center;
      padding-top: ${spacing.sm};
      min-width: 0;
      overflow: hidden;
    `,
    goBackButton: css`
      position: relative;
      top: 8px;
    `,
    parentIcon: css`
      margin: 0 4px;
    `,
    titleText: css`
      ${titleStyles};
    `,
    titleLink: css`
      ${titleStyles};
    `,
    parentLink: css`
      display: none;

      @media ${styleMixins.mediaUp(theme.breakpoints.md)} {
        display: inline-block;
      }
    `,
    actionWrapper: css`
      padding-left: ${spacing.sm};
      padding-top: ${spacing.sm};
    `,
    leftActionItem: css`
      display: none;
      height: 40px;
      position: relative;
      top: 4px;
      align-items: center;
      padding-left: ${spacing.sm};

      @media ${styleMixins.mediaUp(theme.breakpoints.md)} {
        display: flex;
      }
    `,
  };
};
