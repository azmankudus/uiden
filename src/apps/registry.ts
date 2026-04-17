import type { AppConfig } from "../types";
import { APPS } from "~/gateway/lib/apps";
import ayamGoreng from "./ayam-goreng/config";
import shareInsight from "./share-insight/config";
import baseInsight from "./base-insight/config";
import middleHub from "./middle-hub/config";
import webHub from "./web-hub/config";
import certHub from "./cert-hub/config";
import autoHub from "./auto-hub/config";
import softwareHub from "./software-hub/config";
import drHub from "./dr-hub/config";
import ticketHub from "./ticket-hub/config";
import metricsHub from "./metrics-hub/config";
import logHub from "./log-hub/config";
import assetHub from "./asset-hub/config";
import virtualHub from "./virtual-hub/config";
import ipHub from "./ip-hub/config";
import keepHub from "./keep-hub/config";
import sendHub from "./send-hub/config";
import userHub from "./user-hub/config";
import remoteHub from "./remote-hub/config";
import secretHub from "./secret-hub/config";
import runtimeHub from "./runtime-hub/config";
import patchHub from "./patch-hub/config";
import docHub from "./doc-hub/config";
import anyGen from "./any-gen/config";
import luckyHub from "./lucky-hub/config";
import timeHub from "./time-hub/config";
import eventHub from "./event-hub/config";
import markHub from "./mark-hub/config";

const registry: Record<string, AppConfig> = {
  "ayam-goreng": ayamGoreng,
  "share-insight": shareInsight,
  "base-insight": baseInsight,
  "middle-hub": middleHub,
  "web-hub": webHub,
  "cert-hub": certHub,
  "auto-hub": autoHub,
  "software-hub": softwareHub,
  "dr-hub": drHub,
  "ticket-hub": ticketHub,
  "metrics-hub": metricsHub,
  "log-hub": logHub,
  "asset-hub": assetHub,
  "virtual-hub": virtualHub,
  "ip-hub": ipHub,
  "keep-hub": keepHub,
  "send-hub": sendHub,
  "user-hub": userHub,
  "remote-hub": remoteHub,
  "secret-hub": secretHub,
  "runtime-hub": runtimeHub,
  "patch-hub": patchHub,
  "doc-hub": docHub,
  "any-gen": anyGen,
  "lucky-hub": luckyHub,
  "time-hub": timeHub,
  "event-hub": eventHub,
  "mark-hub": markHub,
};

export function getApp(slug: string): AppConfig | undefined {
  return registry[slug];
}

export function getAllApps(): AppConfig[] {
  return Object.values(registry);
}
