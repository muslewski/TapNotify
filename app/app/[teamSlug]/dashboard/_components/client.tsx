"use client";

import {
  Calendar,
  CheckCircle,
  Contact,
  MessageSquare,
  Waypoints,
} from "lucide-react";
import { StatsCard } from "./stats-card";
import { formatTemplateContent } from "@/components/format-template-content";
import { ScrollArea } from "@/components/ui/scroll-area";
import SentMessagesGraph from "@/app/app/[teamSlug]/dashboard/_components/sent-messages-graph";

export default function DashboardClient() {
  return (
    <div className="flex-grow overflow-hidden rounded-lg">
      <ScrollArea className="h-full overflow-y-auto pr-3" type="always">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {/* Campaigns Card */}
          <StatsCard
            title="Campaigns"
            icon={<Waypoints className="h-5 w-5 text-primary" />}
            value={12}
            subtitle="Total campaigns"
            buttonText="View all campaigns" // Custom button text
          >
            <div className="space-y-4">
              {/* Campaign Status Indicators */}
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mb-1" />
                  <span className="text-lg font-semibold text-green-600">
                    3
                  </span>
                  <span className="text-xs text-green-600">Active</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-500 mb-1" />
                  <span className="text-lg font-semibold text-blue-600">7</span>
                  <span className="text-xs text-blue-600">Scheduled</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-purple-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-500 mb-1" />
                  <span className="text-lg font-semibold text-purple-600">
                    2
                  </span>
                  <span className="text-xs text-purple-600">Completed</span>
                </div>
              </div>

              {/* Upcoming Campaigns */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Next Scheduled
                </span>
                <div className="bg-muted/50 p-2 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        Fall Collection Launch
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      2,450 recipients
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Starts in 2 days</span>
                    <span>09:00 AM</span>
                  </div>
                </div>
                <div className="bg-muted/50 p-2 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        New Collection Launch
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      4,272 recipients
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Starts in 4 days</span>
                    <span>11:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </StatsCard>

          {/* Contacts Card */}
          <StatsCard
            title="Contacts"
            icon={<Contact className="h-5 w-5 text-primary" />}
            value={96}
            subtitle="Total contacts"
            buttonText="Browse contact list" // Custom button text
          >
            <div className="space-y-4">
              {/* Contact Statistics */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center p-2 bg-primary/5 rounded-lg">
                  <span className="text-lg font-semibold text-primary">24</span>
                  <span className="text-xs text-muted-foreground">
                    New this month
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 bg-primary/5 rounded-lg">
                  <span className="text-lg font-semibold text-primary">
                    82%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Active contacts
                  </span>
                </div>
              </div>

              {/* Recent Contacts */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Recent Contacts</span>
                  <span className="text-xs text-muted-foreground">
                    Last 24h
                  </span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3 bg-muted/50 p-2 rounded-lg hover:bg-muted/75 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      M
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        Matthew Wilson
                      </p>
                      <p className="text-xs text-muted-foreground">
                        123 456 789
                      </p>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full bg-green-500"
                      title="Active"
                    />
                  </li>
                  <li className="flex items-center space-x-3 bg-muted/50 p-2 rounded-lg hover:bg-muted/75 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      P
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        Philip Brooks
                      </p>
                      <p className="text-xs text-muted-foreground">
                        234 567 421
                      </p>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full bg-green-500"
                      title="Active"
                    />
                  </li>
                  <li className="flex items-center space-x-3 bg-muted/50 p-2 rounded-lg hover:bg-muted/75 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      J
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        John Anderson
                      </p>
                      <p className="text-xs text-muted-foreground">
                        345 678 912
                      </p>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full bg-yellow-500"
                      title="Away"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </StatsCard>

          {/* Message Templates Card */}
          <StatsCard
            title="Message Templates"
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            value={5}
            subtitle="Total templates"
            buttonText="Manage message templates" // Custom button text
          >
            <div className="space-y-4">
              {/* Template Statistics */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center p-2 bg-primary/5 rounded-lg">
                  <span className="text-lg font-semibold text-primary">
                    127
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Messages sent
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 bg-primary/5 rounded-lg">
                  <span className="text-lg font-semibold text-primary">
                    98%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Success rate
                  </span>
                </div>
              </div>

              {/* Popular Templates Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Popular Templates</span>
                  <span className="text-xs text-muted-foreground">
                    Last 7 days
                  </span>
                </div>

                {/* Most Used Template */}
                <div className="space-y-2">
                  <div className="bg-muted/50 p-3 rounded-lg border border-muted">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm font-medium">
                          Default Greeting
                        </span>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Most used
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatTemplateContent(`Hello {{name}}, how are you?`)}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Used 45 times</span>
                      <span>95% response rate</span>
                    </div>
                  </div>

                  {/* Other Templates Preview */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span className="text-xs font-medium">Follow-up</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        Just checking in about...
                      </p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <span className="text-xs font-medium">Thank You</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        Thank you for your...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StatsCard>

          {/* Sent Messages Graph Card remains unchanged */}
          <SentMessagesGraph />
        </div>
      </ScrollArea>
    </div>
  );
}
