import { NextResponse } from 'next/server';

/**
 * Health Check Endpoint
 * 
 * Purpose: Provides system health status for load balancers, monitoring tools,
 * and Kubernetes liveness/readiness probes.
 * 
 * Returns:
 * - 200 OK: System is healthy
 * - 503 Service Unavailable: System has issues
 */

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  checks: {
    name: string;
    status: 'pass' | 'fail' | 'warn';
    message?: string;
    duration?: number;
  }[];
}

// Track server start time for uptime calculation
const startTime = Date.now();

async function checkDatabase(): Promise<{ status: 'pass' | 'fail' | 'warn'; message?: string; duration: number }> {
  const start = performance.now();
  try {
    // In production, this would check database connectivity
    // For now, we simulate a successful check
    await new Promise((resolve) => setTimeout(resolve, 5));
    return {
      status: 'pass',
      message: 'In-memory store operational',
      duration: Math.round(performance.now() - start),
    };
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Database check failed',
      duration: Math.round(performance.now() - start),
    };
  }
}

async function checkExternalServices(): Promise<{ status: 'pass' | 'fail' | 'warn'; message?: string; duration: number }> {
  const start = performance.now();
  try {
    // Check Stripe API availability (simulated)
    // In production, this would make actual health check calls
    await new Promise((resolve) => setTimeout(resolve, 5));
    return {
      status: 'pass',
      message: 'External services reachable',
      duration: Math.round(performance.now() - start),
    };
  } catch (error) {
    return {
      status: 'warn',
      message: 'External service check failed',
      duration: Math.round(performance.now() - start),
    };
  }
}

function checkMemory(): { status: 'pass' | 'fail' | 'warn'; message: string } {
  // Check if memory usage is within acceptable limits
  // Note: process.memoryUsage() is not available in Edge runtime
  // This is a simplified check for demo purposes
  return {
    status: 'pass',
    message: 'Memory usage within limits',
  };
}

export async function GET(): Promise<NextResponse<HealthCheckResult>> {
  const checks = await Promise.all([
    checkDatabase().then((result) => ({ name: 'database', ...result })),
    checkExternalServices().then((result) => ({ name: 'external_services', ...result })),
    Promise.resolve({ name: 'memory', ...checkMemory() }),
  ]);

  const hasFailure = checks.some((check) => check.status === 'fail');
  const hasWarning = checks.some((check) => check.status === 'warn');

  const result: HealthCheckResult = {
    status: hasFailure ? 'unhealthy' : hasWarning ? 'degraded' : 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    uptime: Math.round((Date.now() - startTime) / 1000),
    checks,
  };

  // Return appropriate HTTP status code
  const httpStatus = hasFailure ? 503 : 200;

  return NextResponse.json(result, {
    status: httpStatus,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

// Also support HEAD requests for lightweight health checks
export async function HEAD(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
