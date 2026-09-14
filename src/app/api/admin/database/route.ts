import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getTableNames, getTableData, executeAdminQuery } from '@/lib/db';

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden: Admin access required.' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const tables = getTableNames();

    if (!table) {
      return NextResponse.json({ tables });
    }

    if (!tables.includes(table)) {
      return NextResponse.json({ error: `Table '${table}' not found.` }, { status: 404 });
    }

    const data = getTableData(table, limit, offset);

    return NextResponse.json({
      tables,
      currentTable: table,
      ...data,
    });
  } catch (error: any) {
    console.error('Admin database error:', error);
    return NextResponse.json({ error: 'Failed to read database.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { query, params = [] } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query string is required.' }, { status: 400 });
    }

    // Basic SQL safety check: disallow drop table sqlite_master
    if (/DROP\s+TABLE\s+sqlite_/i.test(query)) {
      return NextResponse.json({ error: 'Cannot drop internal SQLite tables.' }, { status: 400 });
    }

    const result = executeAdminQuery(query, params);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error('Admin query execution error:', error);
    return NextResponse.json({ error: error.message || 'Failed to execute query.' }, { status: 400 });
  }
}
