import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import IfFeature from "../if-feature";
import configs from "../../utils/configs";
import maskEmail from "../../utils/mask-email";
import styles from "./Header.scss";
import { AuthContext } from "../auth/AuthContext";

const secrets = require("../../../CM3D/Scripts/secrets.json");
import { generateEmailName } from "../../../CM3D/Scripts/parse-email.js";

export function Header() {
  const auth = useContext(AuthContext);
  const isSuperAdmin = secrets.superAdmins.includes(auth.email);
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <IfFeature name="show_cloud">
            <li>
              <a href="/cloud">
                <FormattedMessage id="home.cloud_link" />
              </a>
            </li>
          </IfFeature>
          {isSuperAdmin && (
          <IfFeature name="enable_spoke">
            <li>
              <a href="/spoke">
                <FormattedMessage id="editor-name" />
              </a>
            </li>
          </IfFeature>
          )}
          <IfFeature name="show_docs_link">
            <li>
              <a href={configs.link("docs", "https://hubs.mozilla.com/docs")}>
                <FormattedMessage id="home.docs_link" />
              </a>
            </li>
          </IfFeature>
          <IfFeature name="show_source_link">
            <li>
              <a href="https://github.com/mozilla/hubs">
                <FormattedMessage id="home.source_link" />
              </a>
            </li>
          </IfFeature>
          <IfFeature name="show_community_link">
            <li>
              <a href={configs.link("community", "https://discord.gg/wHmY4nd")}>
                <FormattedMessage id="home.community_link" />
              </a>
            </li>
          </IfFeature>
          {auth.isAdmin &&
            isSuperAdmin && (
            <li>
              <a href="/admin" rel="noreferrer noopener">
                <i>
                  <FontAwesomeIcon icon={faCog} />
                </i>
                &nbsp;
                <FormattedMessage id="home.admin" />
              </a>
            </li>
          )}
        </ul>
      </nav>
      <div className={styles.signIn}>
        {auth.isSignedIn ? (
          <div>
            <span>
              <FormattedMessage id="sign-in.as" /> {generateEmailName(auth.email)}
            </span>{" "}
            <a href="#" onClick={auth.signOut}>
              <FormattedMessage id="sign-in.out" />
            </a>
          </div>
        ) : (
          <a href="/signin" rel="noreferrer noopener">
            <FormattedMessage id="sign-in.in" />
          </a>
        )}
      </div>
    </header>
  );
}
